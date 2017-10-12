export class ObjectHelper {
    static objClone(src: object, dst: object): object {
        dst = dst || {};
        // tslint:disable-next-line:forin
        for (const i in src) {
            if (src[i] instanceof Object) {
                dst[i] = (src[i].constructor === Array) ? [] : {};
                ObjectHelper.objClone(src[i], dst[i]);
            } else {
                dst[i] = src[i];
            }
        }
        return dst;
    }
}
