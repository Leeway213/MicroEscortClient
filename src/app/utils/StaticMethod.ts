export class ObjectHelper {
  static objClone(src: object): object {
    var newObj = {};  
    if (src instanceof Array) {  
        newObj = [];  
    }  
    for (var key in src) {  
        var val = src[key];  
        newObj[key] = typeof val === 'object' ? ObjectHelper.objClone(val): val;  
    }  
    return newObj;  
  }
}

