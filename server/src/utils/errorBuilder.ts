export default class ErrorBuilder {
    statusCode = 500;
    message = "Something has gone wrong";

    status(num: number) {
        this.statusCode = num;
        return this;
    }

    msg(str: string) {
        this.message = str;
        return this;
    }
}
