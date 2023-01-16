import colors from "colors";

export const logger = (req, res, next) => {
    const date = new Date();
    const template = `[${date.getFullYear()}-${date.getMonth('2-digit')}-${date.getDay()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}:${date.getMilliseconds().toFixed(2)}]`;
    const fullUrl = '   ' + req.protocol + '://' + req.get('host') + req.originalUrl;
    console.log(template + colors.green(fullUrl));
    
    next()
}