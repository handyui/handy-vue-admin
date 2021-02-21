

/**
 *  函数防抖
 *  @param {Function} func  包装的函数
 *  @param {num} delay      延迟时间
 *  @param {boolean} immediate 第一次滚动会执行两次  开始滚动和结束滚动的时候
 *  @return {*}
 */
export const TOKEN_KEY = 'han_token'

export const debounce=(func, wait, immediate = false)=>{
  let timeout
  return function(){
    const callnow = immediate && !timeout
    timeout && clearTimeout(timeout)
    timeout = setTimeout(() => {
      timeout = null
      if(!immediate) func.apply(this, arguments);
    }, wait);
    if(callnow) func.apply(this, arguments)
  };
}


export const setStorage = (key:string, value:any) => {
  localStorage.setItem(key, JSON.stringify(value))
}

export const getStorage = (key:string) => {
  return JSON.parse(localStorage.getItem(key))
}

export const removeStorage = (key:string) => {
  return localStorage.removeItem(key)
}

/**
 * @param {Array} tree 
 * @param {String} path 
 */
export const genPath = (tree, path)=> {
  let arr = [];
  function func(tree, path = null) {
    tree.forEach((item) => {
      if (path) {
        if (item.path == path) {
          arr.push(path);
        } else {
          return;
        }
      } else {
        arr.push(item.path);
      }
      if (item.children) {
        func(item.children);
      }
    });
  }
  func(tree, path);
  return arr;
}


/**
 * @param {string} url
 * @returns {Object}
 */
export function param2Obj(url) {
  const search = decodeURIComponent(url.split('?')[1]).replace(/\+/g, ' ')
  if (!search) {
    return {}
  }
  const obj = {}
  const searchArr = search.split('&')
  searchArr.forEach(v => {
    const index = v.indexOf('=')
    if (index !== -1) {
      const name = v.substring(0, index)
      const val = v.substring(index + 1, v.length)
      obj[name] = val
    }
  })
  return obj
}

/**
 * @description:  Set ui mount node
 */
export function getPopupContainer(node?: HTMLElement): HTMLElement {
  if (node) {
    return node.parentNode as HTMLElement;
  }
  return document.body;
}
/**
 * Add the object as a parameter to the URL
 * @param baseUrl url
 * @param obj
 * @returns {string}
 * eg:
 *  let obj = {a: '3', b: '4'}
 *  setObjToUrlParams('www.baidu.com', obj)
 *  ==>www.baidu.com?a=3&b=4
 */
export function setObjToUrlParams(baseUrl: string, obj: any): string {
  let parameters = '';
  let url = '';
  for (const key in obj) {
    parameters += key + '=' + encodeURIComponent(obj[key]) + '&';
  }
  parameters = parameters.replace(/&$/, '');
  if (/\?$/.test(baseUrl)) {
    url = baseUrl + parameters;
  } else {
    url = baseUrl.replace(/\/?$/, '?') + parameters;
  }
  return url;
}

export function deepMerge<T = any>(src: any, target: any): T {
  let key: string;
  for (key in target) {
    src[key] =
      src[key] && src[key].toString() === '[object Object]'
        ? deepMerge(src[key], target[key])
        : (src[key] = target[key]);
  }
  return src;
}

/**
 * @description: 根据数组中某个对象值去重
 */
export function unique<T = any>(arr: T[], key: string): T[] {
  const map = new Map();
  return arr.filter((item) => {
    const _item = item as any;
    return !map.has(_item[key]) && map.set(_item[key], 1);
  });
}

/**
 * @description: es6数组去重复
 */
export function es6Unique<T>(arr: T[]): T[] {
  return Array.from(new Set(arr));
}


/**
 * 复制文本
 * @param text
 */
export const copyText = (text: string) => {
  return new Promise((resolve, reject) => {
      const copyInput = document.createElement("input"); //创建一个input框获取需要复制的文本内容
      copyInput.value = text;
      document.body.appendChild(copyInput);
      copyInput.select();
      document.execCommand("copy");
      copyInput.remove()
      resolve(true);
  })
}



/**
 * 组织树改变字段
 * @param org 
 */
export const mapTree = (org) => {
  const haveChildren = Array.isArray(org.children) && org.children.length > 0;
  return {
　　　　 //分别将我们查询出来的值做出改变他的key
      title: org.orgName,
      key: org.id,
      //判断它是否存在子集，若果存在就进行再次进行遍历操作，知道不存在子集便对其他的元素进行操作
      children: haveChildren ? org.children.map(i => mapTree(i)) : [],
      value: org.orgCode,
  }
}