import Head from 'next/head'
import Layout from '../components/layout/layout'
import '../styles/globals.css'

function MyApp({ Component, pageProps }) {
  return (
    <Layout>
      <Head>
        <title>next js events</title>
        <meta
          name="description"
          content="find a lot of great events around the world!"
        />
      </Head>
      <Component {...pageProps} />
    </Layout>
  )
}

export default MyApp
