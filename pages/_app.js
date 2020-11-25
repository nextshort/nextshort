import App from 'next/app';
import 'bootstrap/dist/css/bootstrap.min.css';
const Container = ({ Component, pageProps }) => {
    return (
        <Component {...pageProps} />
    )
}
Container.getInitialProps = async (appContext) => {
    const appProps = await App.getInitialProps(appContext);
    return {
        ...appProps,
    };
}
export default Container;