
import Image from 'next/image';
import { useState, useEffect, useRef } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {seeDetail} from './../store/slice/detail';
import { useRouter } from 'next/router';
import { useQuery, gql } from '@apollo/client';
import Layout from './layout/layout';
import NavbarLayout from './layout/navbar';
import { Search, PeopleExpand, ArrowUp } from '@rsuite/icons/lib/icons';
import {Grid, Row, Col, IconButton, Badge, Modal,
  Button, Container, Divider, Loader} from 'rsuite';
import InfiniteScroller from 'react-infinite-scroller';
/** @jsxImportSource @emotion/react */
import {css, keyframes} from '@emotion/react';


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

const hadPadding = css`
  paddingBottom: 10px;
`



export default function Home() {


const gqlQuery = gql`
  query pokemons($limit: Int, $offset: Int) {
    pokemons(limit: $limit, offset: $offset) {
      count
      next
      previous
      status
      message
      results {
        url
        name
        image
      }
    }
  }`;
const router = useRouter();
const dispatch = useDispatch();
const [isFetch, setIsFetch] = useState(true);
const mylist = useSelector((state) => state.mylist);
const {loading, error, data, fetchMore, networkStatus} = useQuery(gqlQuery, {
  variables: {
    limit: 10,
    offset: 0
  },
  notifyOnNetworkStatusChange: true,
});
const getMore = networkStatus === 3;



const getIntoDetail = (pdata) => {
  dispatch(seeDetail(pdata));
  router.push(`/detail?name=${pdata?.name}`);
}

const fetchPokemon = () => {
  fetchMore({
    variables: {
      limit: data?.pokemons?.results.length + 10
    }
  })
}

  

  return (
    <Container >
        <div  align="center">
          <h3 css={morePokemonHeader}>
            {
              loading ?
              `Waiting Calculating Pokemons...` :
              `Exploring ${data?.pokemons?.results.length} from ${data?.pokemons?.count} Pokemons`
            }
          </h3>
          <Divider></Divider>
          {
            mylist.length > 0 ?
            <h4>
              I have {mylist.length} pokemons right now!
            </h4> :
            <h4>
              {"I don't have any pokemon right now!"}
            </h4>

          }
          <Divider></Divider>
            <InfiniteScroller
              pageStart={0}
              loadMore={fetchPokemon}
              hasMore={data?.pokemons?.results.length < data?.pokemons.count}
              loader={<div className="loader" key={0}>Loading ...</div>}
            >
              <Grid id="pokecontain" css={hadPadding}>
                <Row>  
                  {
                    data?.pokemons?.results.length > 0 &&
                    data?.pokemons?.results.map((po, i) => {
                      const pokeload = ({src}) => {
                        return `${po?.image}`;
                      };
                      return (
                        <Col key={i} xs={24} sm={12} md={8} lg={6}>

                          <div css={pokeCard}>
                            <Image loader={pokeload} src={po?.image} alt={po?.name} width={200} height={200}/>
                            <br></br>
                            <h5>{po?.name}</h5>
                            <br></br>
                              <Row>
                                <Col xs={24} sm={24} lg={24} md={24} >
                                  <IconButton onClick={() => getIntoDetail(po)} icon={<Search/>} color="green" appearance="primary">Detail</IconButton>
                                </Col>
                              </Row>
                          </div>
                        </Col>
                      )
                    })
                  }
                </Row>
                
              </Grid>
            </InfiniteScroller>
          
            {/* <Grid id="pokecontain" css={hadPadding}>
              <Row>  
                {
                  data?.pokemons?.results.length > 0 &&
                  data?.pokemons?.results.map((po, i) => {
                    const pokeload = ({src}) => {
                      return `${po?.image}`;
                    };
                    return (
                      <Col key={i} xs={24} sm={12} md={8} lg={6}>

                        <div css={pokeCard}>
                          <Image loader={pokeload} src={po?.image} alt={po?.name} width={200} height={200}/>
                          <br></br>
                          <h5>{po?.name}</h5>
                          <br></br>
                            <Row>
                              <Col xs={24} sm={24} lg={24} md={24} >
                                <IconButton onClick={() => getIntoDetail(po)} icon={<Search/>} color="green" appearance="primary">Detail</IconButton>
                              </Col>
                            </Row>
                        </div>
                      </Col>
                    )
                  })
                }
              </Row>
              {
                data?.pokemons?.results.length < data?.pokemons.count &&
                <Button loading={getMore} color="blue" appearance='primary' onClick={() => fetchMore({
                  variables: {
                    limit: data?.pokemons?.results.length + 10
                  }
                })}>
                  Load More Pokemon..
                </Button>
              }
              
            </Grid> */}


        
        </div>

    </Container>
  )
}

Home.getLayout = function getLayout(page) {
  return (
   <Layout>
     <NavbarLayout/>
      {page}
   </Layout>
  )
}
