
class CacheLoader {
  constructor(cache) {
    this.cache = cache;
    this.expireTime = 1000 * 60 * 60; // static properties are not supported in GAS
  }

  get(key) {
      let keyEncode = this.keyEncode(key)
      let data = this.cache.get(keyEncode)

      if (!data) return null;

      let decoded = Utilities.base64Decode(data, Utilities.Charset.UTF_8)
      let textBlob = Utilities.newBlob(decoded)
      textBlob.setContentType('application/x-gzip')
      let blob = Utilities.ungzip(textBlob)
      return blob.getDataAsString()
  }

  put(key, value) {
      let keyEncode = this.keyEncode(key)
      let textBlob = Utilities.newBlob(value)
      let gzBlob = Utilities.gzip(textBlob)
      let encoded = Utilities.base64Encode(gzBlob.getBytes())

      if (encoded.length <= 100 * 1000)
        this.cache.put(keyEncode, encoded, this.expireTime);
  }

  remove(key) {
    let keyEncode = this.keyEncode(key)
    this.cache.remove(keyEncode);
  }

  putAndReturn(key, value) {
    this.put(key, value);
    return value;
  }

  keyEncode(key) {
      return Utilities.base64Encode(key)
  }
}