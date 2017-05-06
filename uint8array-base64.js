const base64chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/';
const base64inv = {'0':52,'1':53,'2':54,'3':55,'4':56,'5':57,'6':58,'7':59,'8':60,'9':61,'A':0,'B':1,'C':2,'D':3,'E':4,'F':5,'G':6,'H':7,'I':8,'J':9,'K':10,'L':11,'M':12,'N':13,'O':14,'P':15,'Q':16,'R':17,'S':18,'T':19,'U':20,'V':21,'W':22,'X':23,'Y':24,'Z':25,'a':26,'b':27,'c':28,'d':29,'e':30,'f':31,'g':32,'h':33,'i':34,'j':35,'k':36,'l':37,'m':38,'n':39,'o':40,'p':41,'q':42,'r':43,'s':44,'t':45,'u':46,'v':47,'w':48,'x':49,'y':50,'z':51,'+':62,'/':63};

function encodeBase64 (buf) {
  let str = '';
  for (let i = 0; i < buf.length; i += 3) {
    str += base64chars[buf[i] >>> 2];
    str += base64chars[buf[i] << 4 & 63 | (buf[i + 1] || 0) >>> 4];
    if (i + 1 < buf.length) {
      str += base64chars[buf[i + 1] << 2 & 63 | (buf[i + 2] || 0) >>> 6];
      if (i + 2 < buf.length) {
        str += base64chars[buf[i + 2] & 63];
      } else {
        return str + '=';
      }
    } else {
      return str + '==';
    }
  }
  return str;
}

function decodeBase64 (str) {
  let pad = 0;
  for (let i = str.length - 1; i >= 0; --i) {
    if (str.charAt(i) == '=') {
      ++pad;
    } else {
      break;
    }
  }
  let buf = new Uint8Array(str.length * 3 / 4 - pad);
  for (let i = 0; i < str.length - pad; i += 4) {
    buf[i * 3 / 4] = base64inv[str.charAt(i)] << 2 & 255 | base64inv[str.charAt(i + 1)] >>> 4;
    if (i + 2 < str.length - pad) {
      buf[i * 3 / 4 + 1] = base64inv[str.charAt(i + 1)] << 4 & 255 | base64inv[str.charAt(i + 2)] >>> 2;
      if (i + 3 < str.length - pad) {
        buf[i * 3 / 4 + 2] = base64inv[str.charAt(i + 2)] << 6 & 255 | base64inv[str.charAt(i + 3)];
      }
    }
  }
  return buf;
}
