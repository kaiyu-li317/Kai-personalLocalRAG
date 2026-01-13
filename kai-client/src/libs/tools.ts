import { v4 as uuidv4 } from 'uuid'
/**
 * Generate random string
 * @param {Boolean} randomFlag Whether to use arbitrary length
 * @param {Number} min Minimum length [fixed length]
 * @param {Number} max Maximum length
 */
export const random = (randomFlag:boolean, min:number, max:number) => {
  let str = ''
  let range = min
  // let arr = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'i', 'j', 'k', 'l', 'm', 'n', 'o', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J', 'K', 'L', 'M', 'N', 'O', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  let arr = ['1', '2', '3', '4', '5', '6', '7', '8', '9', 'a', 'b', 'c', 'd', 'e', 'f', 'g', 'h', 'j', 'k', 'm', 'n', 'p', 'q', 'r', 's', 't', 'u', 'v', 'w', 'x', 'y', 'z', 'A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'J', 'K', 'M', 'N', 'P', 'Q', 'R', 'S', 'T', 'U', 'V', 'W', 'X', 'Y', 'Z']
  // Random generation
  if (randomFlag) {
    range = Math.round(Math.random() * (max - min)) + min
  }
  for (let i = 0; i < range; i++) {
    str += arr[Math.round(Math.random() * (arr.length - 1))]
  }
  return str
}
/**
 * Get integer within specified range
 * @param {*} minNum
 * @param {*} maxNum
 */
export const randomNum = function (minNum:number, maxNum:number) {
  let num = 0
  switch (arguments.length) {
    case 1:
      num = parseInt((Math.random() * minNum + 1).toString(), 10)
      break
    case 2:
      num = parseInt((Math.random() * (maxNum - minNum + 1) + minNum).toString(), 10)
      break
  }
  return num
}
/**
 * Check if string is blank or consists only of whitespace
 * @param {*} str
 */
export const isBlank = (str:string) => {
  return (str + '').replace(/(^\s*)|(\s*$)/g, '') === ''
}
/**
 * Check if string is empty (null, undefined, or length==0)
 * @param {*} str
 */
export const isEmpty = (str:string) => {
  let v1 = str === undefined || str === null
  if (v1) return true
  return isBlank(str)
}

/**
 * Deep copy object
 * @param {*} object
 */
export const deepCopy = (object:any) => {
  let result = Array.isArray(object) ? [] as any[] : {} as any
  for (let key in object) {
    if (object.hasOwnProperty(key)) {
      if (typeof object[key] === 'object' && object[key] !== null) {
        result[key] = deepCopy(object[key]) // Recursive copy
      } else {
        result[key] = object[key]
      }
    }
  }
  return result
}

/**
 * Sort array by property
 * array.sort(compare('key'))
 * type: -1 descending, 1 ascending
 */
export const compare = (property:any, type:number) => {
  if (type === undefined) type = 1
  return (a:any, b:any) => {
    let value1 = a[property]
    if (value1 === null || value1 === undefined) value1 = ''
    let value2 = b[property]
    if (value2 === null || value2 === undefined) value2 = ''
    let v1 = Number(value1)
    let v2 = Number(value2)
    if (isNaN(v1)) v1 = value1.charCodeAt()
    if (isNaN(v2)) v2 = value2.charCodeAt()
    if (type > 0) return v1 - v2
    else return v2 - v1
  }
}

/**
 * Copy properties from source to target
 * @param {*} target
 * @param {*} source
 * @param {*} converter Sometimes value may need conversion
 */
export const copyProp = (target:any, source:any, converter:Function) => {
  if (!target || !source) return
  for (const key in source) {
    if (source.hasOwnProperty(key)) {
      let value = source[key]
      if (converter) value = converter(key, value)
      target[key] = value
    }
  }
}
/**
 * Copy properties from source to target
 * Only copy properties that exist in target
 * @param {*} target
 * @param {*} source
 * @param {*} converter Sometimes value may need conversion
 */
export const copySelfProp = (target:any, source:any, converter:Function) => {
  if (!target || !source) return
  for (const key in target) {
    if (target.hasOwnProperty(key)) {
      let value = source[key]
      if (converter) value = converter(key, value)
      target[key] = value
    }
  }
}
/**
 * Check if value is a number
 * @param value
 * @returns 
 */
export const isNumber = (value:any) => {
  return !isNaN(value)
}
/**
 * Check if string contains Chinese characters
 * @param value
 * @returns 
 */
export const isContainChinese = (value:string) => {
  return /[\u4E00-\u9FA5]/g.test(value)
}
/**
 * Convert first letter to lowercase
 * @param value
 * @returns 
 */
export const lowerCaseFirst = (value:string) => {
  return value.charAt(0).toLowerCase() + value.slice(1)
}
/**
 * Convert first letter to uppercase
 * @param value
 * @returns 
 */
export const upperCaseFirst = (value:string) => {
  return value.charAt(0).toUpperCase() + value.slice(1)
}
/**
 * Load file content
 * @param name
 * @returns
 */
export const loadFile = (name:string) => {
  // name is the file location
  let xhr = new XMLHttpRequest()
  const okStatus = document.location.protocol === 'file:' ? 0 : 200
  xhr.open('GET', name, false)
  xhr.overrideMimeType('text/html;charset=utf-8') // Default is utf-8
  xhr.send(null)
  return xhr.status === okStatus ? xhr.responseText : null
}

/**
 * Save data to localStorage
 * @param key
 * @param value
 */
export const localSave = (key:string, value:any) => {
  if (typeof value === 'object') {
    localStorage.setItem(key, JSON.stringify(value))
  } else {
    localStorage.setItem(key, value)
  }
}

/**
 * Get data from localStorage
 * @param {*} key
 */
export const localRead = (key:string) => {
  let value = localStorage.getItem(key) as (string | null)
  if (value === null) {
    return null
  }
  if (isEmpty(value)) {
    return null
  }
  try {
    return JSON.parse(value)
  } catch (error) {
    return value
  }
}
/**
 * Remove data from localStorage
 * @param key
 */
export const localRemove = (key:string) => {
  localStorage.removeItem(key)
}

export const RGBA_COLOR_REGEX = /^rgba?\(\s*(\d{1,3})\s*,\s*(\d{1,3})\s*,\s*(\d{1,3})\s*(,\s*[\d\.]+\s*)?\)$/
export const HEX_COLOR_REGEX = /^#([A-Fa-f0-9]{3}|[A-Fa-f0-9]{6})$/
/**
 * Check if the color is a hex color
 * @param color
 * @returns 
 */
export const isHexColor = (color:string) => {
  return HEX_COLOR_REGEX.test(color);
}

/**
 * Check if the color is an RGBA color
 * @param color
 * @returns
 */
export const isRgbaColor = (color:string) => {
  return RGBA_COLOR_REGEX.test(color);
}

export const rgbaToHex = (rgba: string): string => {
  // Remove possible prefix 'rgba(' and suffix ')'
  const rgbaTrimmed = rgba.replace(/rgba?[\s+]?\(/i, '').replace(/\)[\s+]?/i, '')
  // Split rgbaTrimmed into array containing red, green, blue and alpha values
  const values = rgbaTrimmed.split(/[\s,]+/)
  const r = parseInt(values[0], 10)
  const g = parseInt(values[1], 10)
  const b = parseInt(values[2], 10)
  const a = parseFloat(values[3])
  // Convert RGB values to hexadecimal format
  const toHex = (value: number) => {
      let hex = Math.round(value).toString(16)
      return hex.length === 1 ? '0' + hex : hex
  };
  const hexColor = `#${toHex(r)}${toHex(g)}${toHex(b)}`
  // If needed, can also return HEX color with alpha, e.g. #AARRGGBB
  // const alphaHex = Math.round(a * 255).toString(16);
  // return `#${alphaHex}${hexColor.slice(1)}`;
  return hexColor
}

export const hexToRgba = (color:string, alpha:number = 1) => {
  // Remove possible '#' character
  color = color.replace('#', '')
  // Ensure hex color is 6 digits, if not, duplicate each digit pair to fill 6 digits
  if (color.length === 3) {
    color = color.split('').map(c => c + c).join('')
  }
  // Convert hex color to RGB array
  const rgb = [
    parseInt(color.substring(0, 2), 16),
    parseInt(color.substring(2, 4), 16),
    parseInt(color.substring(4, 6), 16)
  ]
  // Build and return RGBA color string
  return `rgba(${rgb.join()}, ${alpha})`
}

/**
 * Modify the alpha value of an RGBA color
 * @param color
 * @param alpha
 * @returns
 */
export const modifyColorAlpha = (color:string, alpha:number) => {
  // Match the input RGBA color string
  if (isRgbaColor(color)) {
    const match = color.match(RGBA_COLOR_REGEX);
    // If match is successful
    if (match) {
      // Parse the RGBA parts
      const r = parseInt(match[1], 10);
      const g = parseInt(match[2], 10);
      const b = parseInt(match[3], 10);
      const a = match[4] ? parseFloat(match[4]) : 1; // Default to 1 if alpha is not specified
      // Build new RGBA string with the new alpha value
      return `rgba(${r}, ${g}, ${b}, ${alpha})`;
    }
  } else if (isHexColor(color)) {
    return hexToRgba(color, alpha)
  } else {
    return color
  }
}

/**
 * Generate similar colors
 * @param color
 * @param count
 * @returns
 */
export const similarColors = (color:string, count:number, adjustment:number = 10) => {
  let isHex = isHexColor(color)
  let baseColor = isHex ? hexToRgba(color) : color
  const match = baseColor.match(RGBA_COLOR_REGEX)
  let colors:string[] = []
    // If match is successful
  if (!match) {
    for (let i = 0; i < count; i++) {
      colors.push(color)
    }
    return colors
  }
  // Parse the RGBA parts
  const r = parseInt(match[1], 10)
  const g = parseInt(match[2], 10)
  const b = parseInt(match[3], 10)
  
  for (let i = 0; i < count; i++) {
    let rgb = {
      r: Math.min(255, Math.max(0, r + Math.floor(Math.random() * adjustment * 2) - adjustment)),
      g: Math.min(255, Math.max(0, g + Math.floor(Math.random() * adjustment * 2) - adjustment)),
      b: Math.min(255, Math.max(0, b + Math.floor(Math.random() * adjustment * 2) - adjustment))
    }
    let newColor = `rgba(${rgb.r}, ${rgb.g}, ${rgb.b}, 1)`
    if (isHex) {
      colors.push(rgbaToHex(newColor))
    } else {
      colors.push(newColor)
    }
  }
  return colors
}

/**
 * Get uuid
 * @returns uuid
 */
export const uuid = () => {
  return uuidv4().replaceAll('-', '')
}

export const bytesToSize = (bytes:number, separator:string = '') => {
  const sizes = ['B', 'K', 'M', 'G', 'T'];
  if (bytes === 0) return '0 Bytes';
  const i = Math.floor(Math.log(bytes) / Math.log(1024));
  return `${(bytes / Math.pow(1024, i)).toFixed(2)}${separator}${sizes[i]}`;
}

export const copyToClipboard = (text:string) => {
  // navigator clipboard requires https or other secure context
  if (navigator.clipboard && window.isSecureContext) {
    // navigator clipboard writes text to clipboard
    return navigator.clipboard.writeText(text)
  } else {
    // Create text area
    let textArea = document.createElement('textarea')
    textArea.value = text
    // Make text area not in viewport and invisible
    textArea.style.position = 'absolute'
    textArea.style.opacity = '0'
    textArea.style.left = '-999999px'
    textArea.style.top = '-999999px'
    document.body.appendChild(textArea)
    textArea.focus()
    textArea.select()
    return new Promise<void>((res, rej) => {
      // Execute copy command and remove text area
      document.execCommand('copy') ? res() : rej()
      textArea.remove()
    })
  }
}