import Head from "next/head";
/** @jsxImportSource @emotion/react */
import {css} from '@emotion/react';

const centeringImage = css`
  display: block;
  margin-left: auto;
  margin-right: auto;

`

export default function Layout({children}) {
    return (
        <>
            <Head>
                <title>{"Pokemon, Gotta Catch'em All"}</title>
                <meta charset='utf-8' />
                <meta name='viewport' content='width=device-width,initial-scale=1,minimum-scale=1,maximum-scale=1,user-scalable=no' />
                <meta
                    name="description"
                    content="Pokedex for data to hunt the pokemon"
                />
                <meta name='keywords' content='Pokemon' />
                <link rel="manifest" href="/manifest.json" />
                <link href='/favicon-16x16.png' rel='icon' type='image/png' sizes='16x16' />
                <link href='/favicon-32x32.png' rel='icon' type='image/png' sizes='32x32' />
                <link rel="apple-touch-icon" href="/apple-icon.png"></link>
                <meta name="theme-color" content="#317EFB"/>
            </Head>
            <main>{children}</main>
        </>
    )
}