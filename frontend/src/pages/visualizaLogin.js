import axios from 'axios'
import Head from 'next/head'
import Link from 'next/link'
import { useRouter } from 'next/router'
import { useEffect, useState } from 'react'

export default function DetalhesLogin() {

    return (
        <>
            <Head>
                <title>Monitora Envios</title>
                <meta name='description' content='Generated by create next app' />
                <meta name='viewport' content='width=device-width, initial-scale=1' />
                <link rel='icon' href='/favicon.ico' />
            </Head>
            <main>
                <Link href={'/'}><button type='button'>Clientes</button></Link>{' '}             
                <h3>Detalhes do Cliente {data.id}</h3>
                <span><strong>Usuário:</strong>......</span><br />
                <span><strong>E-mail:</strong> ...... </span><br />
            </main>
        </>
    )

}