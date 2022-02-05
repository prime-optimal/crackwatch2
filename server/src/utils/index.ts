export const minifyImageSrc = (src: string) => {
    const split = src.split("/media/");
    return `${split[0]}/media/crop/600/400/${split[1]}`;
};
