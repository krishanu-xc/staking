import Header from "./Header";
import Footer from "./Footer";

import Head from "next/head";

const Layout = ({ children, title, description, ogImage, url, onConnect, address }) => {
  // website Url
  const pageUrl =
    "https://staking-zeta.vercel.app//";
  // when you share this page on facebook you'll see this image
  const ogImg = "/logo-img.png";
  return (
    <>
      <Head>
        <title>
          {title
            ? title
            : "Template - Next.js and Material-UI with Header and Footer"}
        </title>
        <meta
          name="description"
          key="description"
          content={
            description
              ? description
              : "This is a Template using Next.js and Material-UI with Header and Footer."
          }
        />
        <meta
          property="og:title"
          content={
            title
              ? title
              : "Template - Next.js and Material-UI with Header and Footer"
          }
          key="og:title"
        />
        <meta property="og:url" content={url ? url : pageUrl} key="og:url" />
        <meta
          property="og:image"
          content={ogImage ? ogImage : ogImg}
          key="og:image"
        />
        <meta
          property="og:description"
          content={
            description
              ? description
              : "This is a Template using Next.js and Material-UI with Header and Footer."
          }
          key="og:description"
        />
      </Head>
      <Header onConnect={onConnect} address={address} />
      <main>{children}</main>
      <Footer />
      <style jsx global>
        {`
          html,
          body {
            background-image: url('pattern.png');
            background-repeat: repeat;
            background-position: center;
            background-color: #06070E !important;
            padding: 0 !important;
            color: #fff !important;
          }
          #__next {
            min-height: 100vh;
            display: flex;
            flex-direction: column;
            justify-content: space-between;
          }
          main {
            flex: 1;
          }
          #nft-scroll::-webkit-scrollbar-track
          {
            border: 1px solid #E9D758;
            background-color: transparent;
          }
          #nft-scroll::-webkit-scrollbar
          {
            width: 20px;
            background-color: transparent;
          }
          #nft-scroll::-webkit-scrollbar-thumb
          {
            background-color: #E9D758;	
          }
          #unlock-scroll
          {
            height: 248px;
            overflow-y: auto;
            padding-right: 5px;
          }
          #unlock-scroll::-webkit-scrollbar-track
          {
            border: 1px solid #7DCFB6;
            background-color: transparent;
          }
          #unlock-scroll::-webkit-scrollbar
          {
            width: 15px;
            background-color: transparent;
          }
          #unlock-scroll::-webkit-scrollbar-thumb
          {
            background-color: #7DCFB6;
          }
          .MuiPopover-paper
          {
            height: 200px;
            overflow-y: auto;
            padding-right: 5px;
          }
          .MuiPopover-paper::-webkit-scrollbar-track
          {
            border: 1px solid #333745;
            background-color: transparent;
            margin-top: 4px;
            margin-bottom: 4px;
          }
          .MuiPopover-paper::-webkit-scrollbar
          {
            width: 15px;
            background-color: transparent;
          }
          .MuiPopover-paper::-webkit-scrollbar-thumb
          {
            background-color: #E9D758;
          }
        `}
      </style>
    </>
  );
};

export default Layout;
