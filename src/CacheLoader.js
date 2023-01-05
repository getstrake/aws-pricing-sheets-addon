
class CacheLoader {
    constructor(cache) {
        this.cache = cache;
    }

    get(key) {
        let keyEncode = this.keyEncode(key)
        let data = this.cache.get(keyEncode)
        if (data == null)
            return null

        let decoded = Utilities.base64Decode(data, Utilities.Charset.UTF_8)
        let textBlob = Utilities.newBlob(decoded)
        textBlob.setContentType('application/x-gzip')
        let blob = Utilities.ungzip(textBlob)
        return blob.getDataAsString()
    }

    put(key, value, expirationInSeconds) {
        let keyEncode = this.keyEncode(key)
        let textBlob = Utilities.newBlob(value)
        let gzBlob = Utilities.gzip(textBlob)
        let encoded = Utilities.base64Encode(gzBlob.getBytes())

        if (encoded.length > 100000)
            return;

        if (expirationInSeconds) {
            this.cache.put(keyEncode, encoded, expirationInSeconds)
        } else {
            this.cache.put(keyEncode, encoded)
        }
    }

    keyEncode(key) {
        return Utilities.base64Encode(key)
    }
}

