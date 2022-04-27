
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useQuery, gql } from '@apollo/client';
import { useRouter } from 'next/router';
import Layout from './layout/layout';
import NavbarLayout from './layout/navbar';
import { PeopleExpand } from '@rsuite/icons/lib/icons';
import {IconButton, Modal, Input, Notification, toaster,
  Button, Container, Divider, Loader, TagGroup, Tag} from 'rsuite';
import message from './component/notification';
/** @jsxImportSource @emotion/react */
import {css, keyframes} from '@emotion/react';
import { savePokemon } from './../store/slice/mylist';

const morePokemonHeader = css`
  font-style: italic;
  padding-top: 20px;
  padding-bottom: 20px;
  font-weight: lighter
`;

const bounce = keyframes`
  from, 20%, 53%, 80%, to {
    transform: translate3d(0,0,0);
  }

  40%, 43% {
    transform: translate3d(0, -30px, 0);
  }

  70% {
    transform: translate3d(0, -15px, 0);
  }

  90% {
    transform: translate3d(0,-4px,0);
  }
`

const pokeCard = css`
  padding: 10px;
  margin: 10px;
  border-radius: 10px;
  cursor: pointer;
  &:hover {
    background-color: #c7a008;
    animation: ${bounce} 1s ease;
  }
  @media (max-width: 768px) {
    background-color: #c7a008;
  }
`

const centerModal = css`
  text-align: center;
  align: center;
  overflow: hidden;
  word-wrap: break-word;
`

const getImage = css`
  width: 10%;
  @media (max-width: 1024px) {
    width: 20%;
  };
  @media (max-width: 768px) {
    width: 30%;
  };
  @media (max-width: 425px) {
    width: 100%;
  }
`
const showMoreLess = css `
  text-decoration: underline;
  cursor: pointer;
  padding: 10px;
`

export default function Detail() {
const gqlQuery = gql`
  query pokemon($name: String!) {
    pokemon(name: $name) {
      id
      name
      abilities {
        ability {
          name
        }
      }
      moves {
        move {
          name
        }
      }
      types {
        type {
          name
        }
      }
      message
      status
    }
  }`;
const router = useRouter();
const dispatch = useDispatch();
const detailPoke = useSelector((state) => state.detail);
const myPoke = useSelector((state) => state.mylist);
const [name, setName ] = useState(router?.query?.name);
const [nickname, setNickname] = useState("");
const {loading, error, data} = useQuery(gqlQuery, {
  variables: {
    name: name
  }
});
const [open, setOpen] = useState(false);
const [catchStatus, setCatchStatus] = useState(null);
const [limit, setLimit] = useState(10);
const [limitAbilities, setLimitAbilities] = useState(10);
const [limitTypes, setLimitTypes] = useState(10);

useEffect(() => {
  setName(router?.query?.name);
}, [router?.query?.name]);

const catchPoke = (po) => {
  const successRate = Math.random() < 0.5;
  setOpen(true);
  setCatchStatus(successRate);
};

const onCloseModal = () => {
  setOpen(false);
  setCatchStatus(null);
  setNickname("");
};


const onShowMore = (l) => {
  setLimit(l + 10);
}
  
const onShowLess = () => {
  setLimit(10);
}

const onShowMoreAbilities = (l) => {
  setLimitAbilities(l + 10);
}
  
const onShowLessAbilities = () => {
  setLimitAbilities(10);
}

const onShowMoreTypes = (l) => {
  setLimitTypes(l + 10);
}
  
const onShowLessTypes = () => {
  setLimitTypes(10);
}

const pokeload = ({src}) => {
  return `${detailPoke?.image}`;
};


const submitPokemon = () => {
  let pokemonCol = {
    name: detailPoke?.name,
    image: detailPoke?.image,
    url: detailPoke?.url,
    nickname: nickname
  };
  
  const checkValidName = myPoke.filter(x => x.nickname == nickname);
  
  if(checkValidName?.length > 0) {
    toaster.push(message("error", "Nickname is already in used"));
  } else {
    dispatch(savePokemon(pokemonCol));
    onCloseModal();
    toaster.push(message("success", "Saving Pokemon successfully!"), 'topCenter');
  }
}

  return (
    <Container>
        <Modal full size="xs" open={open} onClose={() => onCloseModal()}>
          <Modal.Header>
            <Modal.Title css={centerModal}>
              {
                catchStatus === false ?
                `${detailPoke?.name} escaped!` :
                catchStatus == true ?
                `catched ${detailPoke?.name}!` : null
              }
            </Modal.Title>
            
          </Modal.Header>
          <Modal.Body css={centerModal}>
            {
              detailPoke?.image != "" &&
              <Image loader={pokeload} src={detailPoke?.image} width={200} height={200} alt={detailPoke?.name}/>
            }
            <br></br>
            {
              catchStatus == true &&
              <Input
                size='sm'
                type="text"
                value={nickname}
                placeholder='Give a nickname...'
                onChange={(e) => setNickname(e)}
              />
            }
          </Modal.Body>
          {
            catchStatus == true &&
            <Modal.Footer>
              <Button onClick={() => submitPokemon()} appearance="primary">
                Save Pokemon!
              </Button>
            </Modal.Footer>
          }

        </Modal>
        <div align="center">
          
          <Image loader={pokeload} src={detailPoke?.image} alt={detailPoke?.name} width={200} height={200}/>
          <br></br>
          <IconButton onClick={() => catchPoke(detailPoke)} icon={<PeopleExpand/>} color="red" appearance="primary">Catch</IconButton>
          <h3 css={morePokemonHeader}>{detailPoke?.name}</h3>
          {
            loading ?
            <Loader center content="Getting Pokemon Detail..." vertical size="lg"/> : 
            <>
              <Divider>
                <h3>Types</h3>
              </Divider>
              {
                data?.pokemon?.types.length > 0  &&
                <TagGroup>
                    {
                      data?.pokemon?.types.length > 10 ?
                      data?.pokemon?.types?.slice(0, limitTypes).map((ty, y) => {
                        return (
                          <Tag size="lg" key={y} color="green">
                            {ty?.type?.name}
                          </Tag>
                        )
                      }) :
                      data?.pokemon?.types.map((ty, y) => {
                        return (
                          <Tag size="lg" key={y} color="green">
                            {ty?.type?.name}
                          </Tag>
                        )
                      })
                    }
                </TagGroup>
              }
              {
                data?.pokemon?.types?.length > 10 &&
                <>
                
                  {
                    data?.pokemon?.types?.length > 10 &&
                    limitTypes < data?.pokemon?.types?.length ?
                    <p onClick={() => onShowMoreTypes(limitTypes)} css={showMoreLess}>....Show More</p> :
                    <p onClick={() => onShowLessTypes()} css={showMoreLess}>...Show less</p>
                  }
                </>
              }

              <Divider>
                <h3>Abilities</h3>
              </Divider>

              {
                data?.pokemon?.abilities.length > 0 &&
                <TagGroup>
                  {
                    data?.pokemon?.abilities.length > 10 ?
                    data?.pokemon?.abilities?.slice(0, limitAbilities).map((ab, i) => {
                      return (
                        <Tag key={i} color="blue" size="lg">
                          {ab?.ability?.name}
                        </Tag>
                      )
                    }) :
                    data?.pokemon?.abilities?.map((ab, i) => {
                      return (
                        <Tag key={i} color="blue" size="lg">
                          {ab?.ability?.name}
                        </Tag>
                      )
                    })
                  }
                </TagGroup>
              }
              {
                data?.pokemon?.abilities?.length > 10 &&
                <>
                
                  {
                    data?.pokemon?.abilities?.length > 10 &&
                    limitAbilities < data?.pokemon?.abilities?.length ?
                    <p onClick={() => onShowMoreAbilities(limitAbilities)} css={showMoreLess}>....Show More</p> :
                    <p onClick={() => onShowLessAbilities()} css={showMoreLess}>...Show less</p>
                  }
                </>
              }

              <Divider>
                <h3>Moves</h3>
              </Divider>

              {
                data?.pokemon?.moves.length > 0 &&
                <TagGroup>
                  {
                    data?.pokemon?.moves.length > 10 ?
                    data?.pokemon?.moves?.slice(0, limit)?.map((mo, i) => {
                      return (
                      <Tag color="red" key={i} size="lg">
                        {mo?.move?.name}
                      </Tag>
                      )
                    })  :
                    data?.pokemon?.moves?.map((mo, i) => {
                      return (
                      <Tag color="red" key={i} size="lg">
                        {mo?.move?.name}
                      </Tag>
                      )
                    })
                  }
                </TagGroup>
              }
              {
                data?.pokemon?.moves?.length > 10 &&
                <>
                  {
                    data?.pokemon?.moves?.length > 10 &&
                    limit < data?.pokemon?.moves?.length ?
                    <p onClick={() => onShowMore(limit)} css={showMoreLess}>....Show More</p> :
                    <p onClick={() => onShowLess()} css={showMoreLess}>...Show less</p>
                  }
                </>
              }
            </>
          }
        
        </div>

    </Container>
  )
}

Detail.getLayout = function getLayout(page) {
  return (
   <Layout>
     <NavbarLayout/>
      {page}
   </Layout>
  )
}
