import { Roboto, Inter, Sarpanch, Lato, Noto_Sans } from "next/font/google";

const roboto = Roboto({
    weight: ['100', '300', '400', '500', '700', '900'],
    subsets: ['latin']
})

const inter = Inter({
    weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900'],
    subsets: ["latin"]
});

const sarpanch = Sarpanch({
    weight: ['400', '500', '600', '700', '800', '900'],
    subsets: ['latin']
})

const lato = Lato({
    weight: ['100', '300', '400', '700', '900'],
    subsets: ['latin']
})
const noto_sans = Noto_Sans({
    weight: ['100', '200', '300', '400', '500', '700', '800', '900'],
    subsets: ['latin']
})

function useFont() {
    

    return { roboto, lato, noto_sans, sarpanch, inter }
}

export default useFont;
