import styled, { createGlobalStyle } from "styled-components";

export const Global = createGlobalStyle`
    body, button, input, select, textarea {
        font-family: sans-serif;
        color: #222;
    }
    body {
        font-family: Helvetica,arial,sans-serif;
        font-weight: normal;
        line-height: 1.6em;
        font-size: 12px;
        letter-spacing: 0px;
        font-family: europa;
        font-weight: 300;
        font-style: normal;
        line-height: 1.8em;
        letter-spacing: .04em;
        font-size: 14px;
        -webkit-font-smoothing: subpixel antialiasing !important;
        margin: 0;
        font-size: 13px;
        line-height: 1.6em;
        background-color: #fff;
        color: #666;
    }

    * {
        box-sizing: border-box;
    }

    // eslint-disable-line
    @font-face{font-family:brandon-grotesque;src:url(https://use.typekit.net/af/1281a1/000000000000000077359ded/30/l?subset_id=2&fvd=n3&v=3) format("woff2"),url(https://use.typekit.net/af/1281a1/000000000000000077359ded/30/d?subset_id=2&fvd=n3&v=3) format("woff"),url(https://use.typekit.net/af/1281a1/000000000000000077359ded/30/a?subset_id=2&fvd=n3&v=3) format("opentype");font-weight:300;font-style:normal;font-display:auto;}@font-face{font-family:brandon-grotesque;src:url(https://use.typekit.net/af/257c86/000000000000000077359df6/30/l?subset_id=2&fvd=n9&v=3) format("woff2"),url(https://use.typekit.net/af/257c86/000000000000000077359df6/30/d?subset_id=2&fvd=n9&v=3) format("woff"),url(https://use.typekit.net/af/257c86/000000000000000077359df6/30/a?subset_id=2&fvd=n9&v=3) format("opentype");font-weight:900;font-style:normal;font-display:auto;}@font-face{font-family:europa;src:url(https://use.typekit.net/af/821a05/00000000000000007735a082/30/l?subset_id=2&fvd=n3&v=3) format("woff2"),url(https://use.typekit.net/af/821a05/00000000000000007735a082/30/d?subset_id=2&fvd=n3&v=3) format("woff"),url(https://use.typekit.net/af/821a05/00000000000000007735a082/30/a?subset_id=2&fvd=n3&v=3) format("opentype");font-weight:300;font-style:normal;font-display:auto;}@font-face{font-family:europa;src:url(https://use.typekit.net/af/1db03a/00000000000000007735a08e/30/l?subset_id=2&fvd=n4&v=3) format("woff2"),url(https://use.typekit.net/af/1db03a/00000000000000007735a08e/30/d?subset_id=2&fvd=n4&v=3) format("woff"),url(https://use.typekit.net/af/1db03a/00000000000000007735a08e/30/a?subset_id=2&fvd=n4&v=3) format("opentype");font-weight:400;font-style:normal;font-display:auto;}@font-face{font-family:europa;src:url(https://use.typekit.net/af/ebcd51/00000000000000007735a081/30/l?subset_id=2&fvd=n7&v=3) format("woff2"),url(https://use.typekit.net/af/ebcd51/00000000000000007735a081/30/d?subset_id=2&fvd=n7&v=3) format("woff"),url(https://use.typekit.net/af/ebcd51/00000000000000007735a081/30/a?subset_id=2&fvd=n7&v=3) format("opentype");font-weight:700;font-style:normal;font-display:auto;}@font-face{font-family:europa;src:url(https://use.typekit.net/af/d08711/00000000000000007735a08a/30/l?subset_id=2&fvd=i3&v=3) format("woff2"),url(https://use.typekit.net/af/d08711/00000000000000007735a08a/30/d?subset_id=2&fvd=i3&v=3) format("woff"),url(https://use.typekit.net/af/d08711/00000000000000007735a08a/30/a?subset_id=2&fvd=i3&v=3) format("opentype");font-weight:300;font-style:italic;font-display:auto;}@font-face{font-family:europa;src:url(https://use.typekit.net/af/2a1b80/00000000000000007735a09e/30/l?subset_id=2&fvd=i7&v=3) format("woff2"),url(https://use.typekit.net/af/2a1b80/00000000000000007735a09e/30/d?subset_id=2&fvd=i7&v=3) format("woff"),url(https://use.typekit.net/af/2a1b80/00000000000000007735a09e/30/a?subset_id=2&fvd=i7&v=3) format("opentype");font-weight:700;font-style:italic;font-display:auto;}
`;

export const SiteWrapperContainer = styled.main`
	min-height: 100vh;
`;

export const TestNetBanner = styled.div`
	position: fixed;
	top: 0;
	left: 0;
	height: 64px;
	color: #000;
	background: #dea81f;
	display: flex;
	justify-content: center;
	align-items: center;
	font-size: 1.2rem;
	width: 100vw;
	z-index: 9999;
`;
