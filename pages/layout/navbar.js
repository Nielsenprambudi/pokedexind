import Image from 'next/image';
import { useRouter } from 'next/router';
import { Navbar, Nav, Header } from 'rsuite';
import { AppSelect, Storage } from '@rsuite/icons/lib/icons';
import { useState } from 'react';
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';

const sidebarStyle = css`
    display: flex;
    flex-direction: column;
    height: 100%;

`

const NavbarLayout = () => {
    const router = useRouter();
    const [expanded, setExpanded] = useState(false);
    const [activeKey, setActiveKey] = useState('list');
    const pokelogo = ({src}) => {
        return `https://www.freepnglogos.com/uploads/pokemon-logo-text-png-7.png`
    }

    return (
        // <Container >
        <Header>
            <Navbar>
                <Navbar.Brand>
                    <Image
                        loader={pokelogo} 
                        src="https://www.freepnglogos.com/uploads/pokemon-logo-text-png-7.png" 
                        width={100}
                        height={30}
                        alt="pokedex"
                        onClick={() => router.push("/")}
                    />
                </Navbar.Brand>
                <Nav
                    activeKey={activeKey}
                    onSelect={setActiveKey}
                >
                    <Nav.Item onClick={() => router.push("/")} eventKey="list">
                       <AppSelect size="5em"/> POKELIST
                    </Nav.Item>
                    <Nav.Item onClick={() => router.push("/myownedlist")} eventKey="mylist">
                        <Storage size="5em"/> MY POKEMON
                    </Nav.Item>
                </Nav>
            </Navbar>

        </Header>
            
            
        // </Container>
    )
}

export default NavbarLayout;