
class CacheLoader {
  expireTime = 1000 * 60 * 60; // 1 hour
  constructor(private readonly cache: GoogleAppsScript.Cache.Cache) {}

  get(key: string): string|null {
      let keyEncode = this.keyEncode(key)
      let data = this.cache.get(keyEncode)

      if (!data) return null;

      let decoded = Utilities.base64Decode(data, Utilities.Charset.UTF_8)
      let textBlob = Utilities.newBlob(decoded)
      textBlob.setContentType('application/x-gzip')
      let blob = Utilities.ungzip(textBlob)
      return blob.getDataAsString()
  }

  put(key: string, value: string) {
      let keyEncode = this.keyEncode(key)
      let textBlob = Utilities.newBlob(value)
      let gzBlob = Utilities.gzip(textBlob)
      let encoded = Utilities.base64Encode(gzBlob.getBytes())

      if (encoded.length <= 100 * 1000)
        this.cache.put(keyEncode, encoded, this.expireTime);
  }

  putAndReturn(key, value) {
    this.put(key, value);
    return value;
  }

  private keyEncode(key: string): string {
      return Utilities.base64Encode(key)
  }
}