const rp = require("request-promise")
const xlog = require("../utils/xlog")
const DAT = "13f345e83e9a0b4f"
const TOKEN = "0DSqX5hKM8XSbHKswn1Y8w==|VtLvF4Qc+u5NUWplSyGSlwqrhxmgf+Bn39JZuUaIXltxQ5YIcpRkqQ7gcTMFFTPJluQO00SetaU=|0QaOJoPUEAJMBYla|08|3"
const COOKIE = `_gcl_au=1.1.759986680.1766645207; _fbp=fb.1.1766645207136.422826856316156503; csrftoken=8JnDgJ5iDayNdOYGjThJJ36XHtAMtMvs; SPC_F=5NbmhAyjXVUfmTv9QqFCX1H6SHF6xPid; REC_T_ID=af37cb69-e15d-11f0-8949-fa943f6c8f5d; SPC_CLIENTID=NU5ibWhBeWpYVlVmxxldzxdifrevfbtn; _hjSessionUser_868286=eyJpZCI6ImUxMWYxZjlhLTBmZTEtNTMxNC04MDU0LTdlMDI4Yjg5MDI0ZCIsImNyZWF0ZWQiOjE3NjY2NDUyOTUwMjIsImV4aXN0aW5nIjp0cnVlfQ==; SPC_CDS_CHAT=20e29321-ac37-4fef-94d1-715df0161ff4; SC_DFP=BkQThUinvOFREzMgsEUTboOlYYrKYRQr; _med=refer; language=vi; _QPWSDCXHZQA=53223e08-eb20-4348-8553-dd51fc6feee5; REC7iLP4Q=8442b447-a1d0-4922-95c1-338ae5e6d322; _sapid=051badb7116585de004661b5e368ff120a53e65f9eda839291b54ca2; _med=affiliates; _fbc=fb.1.1768026530483.IwY2xjawPO0PBleHRuA2FlbQIxMABicmlkETFmamhMM05uYWRsNkZKSXc3c3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHo6KUNWVVc1a1s90fgUH1yA4N-lhcX1hLD65eBF7-m-qN3wDJIxzDbP8ywRY_aem_SGbWutC0HT8VG19U4UszOA; language=vi; SPC_SI=AVFTaQAAAABmdnZmUWVXWSQSRwAAAAAAUGtEaWZOSVQ=; _gid=GA1.2.509232297.1768122240; _hjSession_868286=eyJpZCI6IjVlMGM2NjI0LTEzYjUtNDQwNy1hMWFhLWE0OTM2MjBkM2IyZCIsImMiOjE3NjgxNDM5NDg4MjQsInMiOjAsInIiOjAsInNiIjowLCJzciI6MCwic2UiOjAsImZzIjowLCJzcCI6MH0=; SPC_ST=.aDhKSG1ncGZ4elN6TDhrb9Z84MZlOpvTWO2M4cPU2Hk7WBTOOFj04KTfpOiuC/C2qhddc95YUiQBEDspiljfvhfb8qvuZbMsr2L9JfV9jaO1FiGMqHx6Ap+gIE4dMn99YWbdJin3mIYYDkHRo9DYfLbMZTttRosA2MSrIsBWgaE4sxRrbOQMtYdqPBfxd3Dz9Rc6fBKvNyVUBQCkITD9WcNBbgLOJfR/bpWKXDrQ5UyaCDUN2azbyauKVRRjwGKo3gq5DAyTgOUwgzC4OlH/jQ==; SPC_U=1665184275; SPC_R_T_ID=xaEygST2xjZYrp03i90Vs6LzYhtARPdii3L6Wky88/No4Es3KZGXxBJuLVZ7q37F6yGZlTUx5+Ce2SFPU+9tEutgpjDIqQQmXXiSdQ1X4wbXJn4YxvkJDr8LuWpnA1sDDYeDjRRkyIoH6Gygnuwn8pOsg893CmEnkfA43GWo3ho=; SPC_R_T_IV=QzI3OEhzRFUySlpLU0NxMA==; SPC_T_ID=xaEygST2xjZYrp03i90Vs6LzYhtARPdii3L6Wky88/No4Es3KZGXxBJuLVZ7q37F6yGZlTUx5+Ce2SFPU+9tEutgpjDIqQQmXXiSdQ1X4wbXJn4YxvkJDr8LuWpnA1sDDYeDjRRkyIoH6Gygnuwn8pOsg893CmEnkfA43GWo3ho=; SPC_T_IV=QzI3OEhzRFUySlpLU0NxMA==; AMP_TOKEN=%24NOT_FOUND; _dc_gtm_UA-61914164-6=1; shopee_webUnique_ccd=35hm%2BUtDbrS16xxYUOjrIA%3D%3D%7CXdLvF4Qc%2Bu5NUWplSyGSlwqrhxmgf%2BBn39JZuZT%2BeVtxQ5YIcpRkqQ7gcTMFFTPJluQO00SetaUJfw%3D%3D%7C0QaOJoPUEAJMBYla%7C08%7C3; ds=841d209382613511d19dd495ef4bbd3c; _ga=GA1.2.1379595859.1766645295; SPC_EC=.a2pQU090VFFFbzM3SmtuVgbdpc/Gtz5mytc5O40e0dHDMv6Y3G+taG9lqREstLIdJivzuBtmBfcyeOOL4P4CygqfI+dCnWe0i2QjtFt5dE2sjuqFGqJ/uqjYajVNjNAoo/l2CI5CQ1Jr+JAPgM8HLy4R7TzeaISBUxhchp7oA9bxaniLGjyowSOkffvJaeGNhBhwq9dFZGmCkwX3O4qeghqqKu4qUMIgmvIgPXD95U1QPdWgNYUTAAqB+27kFlFByYKuMtPGku8Se3/o6eNDDA==; _ga_4GPP1ZXG63=GS2.1.s1768142754$o11$g1$t1768146582$j23$l0$h1746174352`


const FETCH_SAMPLE = 
`
curl 'https://affiliate.shopee.vn/api/v3/gql?q=batchCustomLink' \
  -H 'accept: application/json, text/plain, */*' \
  -H 'accept-language: en-US,en;q=0.9' \
  -H 'af-ac-enc-dat: 6b144af2249ad763' \
  -H 'af-ac-enc-sz-token: O82qbIM51qiG8/yG4jJ7Ig==|G0+BDIevShj6HnxKU5FIn+Hae2v+W41xZUV7wAlyyMSqkfd3RkZQHqwpiwHk1ZtPi/CM7mNzoDbOgJ3M4F9G|T9wa4uikA8yo8yU7|08|3' \
  -H 'affiliate-program-type: 1' \
  -H 'content-type: application/json; charset=UTF-8' \
  -b 'csrftoken=NzyilNLMUxGC60fSfRaJdvhgmzoqGpVQ; SPC_F=Thf9yXBbHpNVL9vGtUB1T74CByvHqLlQ; REC_T_ID=2593f4ca-221a-11f1-ab54-aaafd87bf611; SPC_SI=lda3aQAAAABLSXhaaVdWQ0x9IQAAAAAAWlBNdDBnVHg=; SPC_CLIENTID=VGhmOXlYQmJIcE5Wgippphwcgeychuzb; language=vi; SPC_ST=b09WeVd2Q0E0djBmejBqb2lWOgFySwKgGo2H8Z4O1iW+W1uRNqAk2Ohf/HOE8vemDpwaWZCH4Smvu6SffGnBfSb9li9UhIIKDIEZdqeIXeZ1CHIHOAWt1EEN7M5p7XR9ut/ymwSQRljl2lhvINAgNRpD54GRTyCcviGNWVzdSJk6tWCvWeF4YOSeyzFxJ5D1lBCrmhYuWUVJl8iuih0OTSn/KaTfYQj8ZKxN5aTeOEflItGsL4chlkBeVQGFok3p.AEvdo80TVDpWQIk38FvAsFMhvg+JVMBMAkRl+odm1LBu; SPC_U=1665184275; SPC_R_T_ID=jPV7A/Jvx+pRnpiFfl2ZjhCelqeNUYnn5TW8+T32wSL6JZaydKzgfz3Ek+zzAdQ+7JyyFRTtcHY7XD33x3VRCywlLbNdsUn+efeDrFd1ZDtyqcIHY5j6wdN3EONmR8e5NQQnH/jKZxdnfDgCB6eB/SPdFdXaNkkXpOtAb6ZzaDs=; SPC_R_T_IV=YmM1NENmdVJnTnhpd3pTUw==; SPC_T_ID=jPV7A/Jvx+pRnpiFfl2ZjhCelqeNUYnn5TW8+T32wSL6JZaydKzgfz3Ek+zzAdQ+7JyyFRTtcHY7XD33x3VRCywlLbNdsUn+efeDrFd1ZDtyqcIHY5j6wdN3EONmR8e5NQQnH/jKZxdnfDgCB6eB/SPdFdXaNkkXpOtAb6ZzaDs=; SPC_T_IV=YmM1NENmdVJnTnhpd3pTUw==; SPC_CDS_CHAT=d774488d-53c6-4bc6-9507-caebffd881b0; language=vi; _QPWSDCXHZQA=23747c06-ed02-46e1-c740-f0077eaec96d; REC7iLP4Q=73b1f6c5-822b-46cb-802a-dbfcb54c8e14; _sapid=9a14c99fa69570f69f49059dc517dfede97a8ada2cd4913c9c3a9771; shopee_webUnique_ccd=O82qbIM51qiG8%2FyG4jJ7Ig%3D%3D%7CG0%2BBDIevShj6HnxKU5FIn%2BHae2v%2BW41xZUV7wAlyyMSqkfd3RkZQHqwpiwHk1ZtPi%2FCM7mNzoDbOgJ3M4F9G%7CT9wa4uikA8yo8yU7%7C08%7C3; ds=a0a7f4b01fd910b03ccfec7405ce53d0; SPC_EC=VlJmZ2VXOHhLeDNUaDFlSwbKrjj604QfThjxlqdo7S0XgdpA2X0+OCOuK4IYQvcQg78+k84e5RtpaJw0pJOwCC2QIQrsTe3GnuD5Fs/xi5TYxvrMHPv6VPERB5I+rjMlhUgNFWX/wetAVMLCB6gRl242IzPYPnGM6jBLuHKFIoEndG1vkdKfaBtECsJZjAIUq2WSGvFluIu87xafEjnwkd9++O6T618Efq2u3mOV5cn2bYZvftlvCUDfzkOPxYKz.AIM2Kmy768aOq3UXg7pQZJjtxt9kGCPQVNdDFfRbY7vA' \
  -H 'csrf-token: qp9mF2z0-1tkt2bH1PZ9J_T7zw7q1hnbE7rM' \
  -H 'origin: https://affiliate.shopee.vn' \
  -H 'priority: u=1, i' \
  -H 'referer: https://affiliate.shopee.vn/offer/custom_link' \
  -H 'sec-ch-ua: "Chromium";v="146", "Not-A.Brand";v="24", "Brave";v="146"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "macOS"' \
  -H 'sec-fetch-dest: empty' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-site: same-origin' \
  -H 'sec-gpc: 1' \
  -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/146.0.0.0 Safari/537.36' \
  -H 'x-sap-ri: f386b969b8ade5acbe731a3b0501dd8d5f8493bab2ea698166b3' \
  -H 'x-sap-sec: UWVxdf1Xur1OAI0fTrqfTIiforuwTp0fErqBT4dfGXuYTIiffrqkT59fjru5TOkfDjqxT50flNnATkYfPrq/TO4fZrqITIafIXqKTpyfrXnfTPYfirurTh+fArulTJkfJjuHTh9f9jqETpYfOrnQTP9fCruIToqfbrnMTpSf8jqnTJqfIru4TrqfMr9fTrqfTrUe/uubTrqffLQHtnMBTXqfTrqfJbgVwBzWTXqftrTfT4CvlbTfTOjSjr9fTrqfoHyfTrugTru1k50iTrqf0W8HbrqfTSYiTrqvTjqfmh7tYrqfTE6WTNqfurTfTrqfw3S0r8fdTrqfa3NSKzk/TNqfTrupJfogTrtkNrnrMZUa5/ENTJPKTXqfTru6CN0jTrtWTNqfTkF+ocHv0pUiHlfuTrqrk3dfTrtTSFqsICKQogPRt4RA5HHcBUCktSRHC5FDNUxVjufy9G4A9lcwFs0j0DdKNFuyQVA/NrusgiuSWQzkHSljX73u/7GRRzmKxLzZN4xI7BewT0EwOB+OGfiM/PzkwSgriRGeRD4fDNbyIYH6d0BJk+mGlwS0hBohZtqvrVoWVRnsOYKfWOkkjRxlHkid7l3Bp+g7rrn3ukR2HHVx6kDIRcR7CuupNoLsjb+41lSYCpDWoIlTI6T7IY6V3UsyU3LJDEUhfV7FiYjcdtBgv9Go/v7iGu3oJXq75sgUKoDD8rIpHlT1BfWGEl1Oumdxwy2BxXqCTrqfFg1EDq8VET0lTrqfAR3+MhdfTrqh7RCba1j0G0SqF93wV8AlwlOx0pGYGI/P0ecchIxII46edGgUtnMmsiHfa2pPxq/w826Alhm5bJ9ni9XgfnIn7PLg8W2moV0CEuV108SYG3S4vDZ9GCUsgaKl2smshHotCnB+ddJo4IpkNfHviqIcZbtqVXO/yOcBt0qCrlYbY3YBvW0g1bYwzRHYRLnNGSPo6DXpAYDbF/29D7R3Y6H89G5wZwqtjo5Hro0lCFODTrYfTrnz2jqdFXqfT5/SGUNsRf5ZmKzK0QglTrqfTrqfTrqfT59fTrqedNvxD1ietNLHvtbNNTYknbTj7rWXa+7WeiCc10XOF9eeGeqa5FaWWLdw2JFTyk9bLgDNVquEW+s69hae5Q0X9tifTrqfTrqfTrqf9jqfTk3L1hSNPlYCWL1JEPnyYkH9KMofVrqfT5eLwvASdPXaiKpJ28Pu1RRCsFI+C0aciRE5VxAHdPytl3kNHNqfTrqsTrqfz3N52PLbUkkUsQcJCHjrlAZLYvHHdg0n8Cr52gIWYkotpDvMwYzP8RM/1vw4RgiVz32JSQgg1A7fTrqfDrqfT4xK0BLX2ibETrqfTrqfTrquTrqfi1VwHNRSZvQ2H6/9wHVhwouq07yGLggvZlu4TrofTruEJzgfmxiFGrofTrudqWisqBqhbXqfTrn=' \
  -H 'x-sz-sdk-version: 1.12.21' \
  --data-raw $'{"operationName":"batchGetCustomLink","query":"\\n    query batchGetCustomLink($linkParams: [CustomLinkParam\u0021], $sourceCaller: SourceCaller){\\n      batchCustomLink(linkParams: $linkParams, sourceCaller: $sourceCaller){\\n        shortLink\\n        longLink\\n        failCode\\n      }\\n    }\\n    ","variables":{"linkParams":[{"originalLink":"https://shopee.vn/Tai-nghe-U19-Nhi%E1%BB%81u-m%C3%A0u-gi%E1%BA%AFc-c%E1%BA%AFm-3.5mm-c%C3%B3-m%C3%ADc-d%C3%A0nh-cho-m%E1%BB%8Di-%C4%91i%E1%BB%87n-tho%E1%BA%A1i-Android-iOs-6s-6plus-Samsung-i.878113998.23782712957?extraParams=%7B%22display_model_id%22%3A157047438918%2C%22model_selection_logic%22%3A3%7D","advancedLinkParams":{"subId1":"test"}}],"sourceCaller":"CUSTOM_LINK_CALLER"}}'
`

function extractHeadersFromCurl(curlText) {
    const headers = {}

    // 1. Match tất cả -H 'key: value'
    const headerRegex = /-H\s+'([^:]+):\s*([^']*)'/g
    let match

    while ((match = headerRegex.exec(curlText)) !== null) {
        const key = match[1].trim()
        const value = match[2].trim()
        headers[key] = value
    }

    // 2. Match cookie từ -b '...'
    const cookieMatch = curlText.match(/-b\s+'([^']+)'/)
    if (cookieMatch) {
        headers["cookie"] = cookieMatch[1].trim()
    }

    return headers
}


async function getRedirectURL(url) {
    try {
        const options = {
            method: 'HEAD',
            uri: url,
            resolveWithFullResponse: true,
            followRedirect: false,
            simple: false,
            headers: {
                'accept': 'application/json',
                'content-type': 'application/json; charset=UTF-8',
                'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36',
            },
        };
        let res = await rp(options)

        if (res.statusCode >= 300 && res.statusCode < 400) {
            let location = res.headers.location
            return location
        }

        return url
    } catch (error) {
        xlog.error("getRedirectURL error", error)
        return url
    }
}

async function getLink(urls, subId) {
    try {
        let linkParams = []

        let cleanUrls = []
        for (let url of urls) {
            let destURL = await getRedirectURL(url)
            let urlParsed = new URL(destURL)

            let cleanUrl = urlParsed.origin + urlParsed.pathname
            cleanUrls.push(cleanUrl)

            linkParams.push(
                {
                    originalLink: cleanUrl,
                    advancedLinkParams: {
                        subId1: subId
                    }
                }
            )
        }

        const headers = extractHeadersFromCurl(FETCH_SAMPLE)
        delete headers["csrf-token"]
        delete headers["x-sap-ri"]
        delete headers["x-sap-sec"]
        delete headers["x-sz-sdk-version"]

        const options = {
            method: 'POST',
            uri: 'https://affiliate.shopee.vn/api/v3/gql?q=batchCustomLink',
            headers: headers,
            // headers: {
            //     'accept': 'application/json',
            //     'affiliate-program-type': '1',
            //     'content-type': 'application/json; charset=UTF-8',
            //     'origin': 'https://affiliate.shopee.vn',
            //     'referer': 'https://affiliate.shopee.vn/offer/custom_link',
            //     'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36',
            //     "sec-ch-ua": "Google Chrome\";v=\"143\", \"Chromium\";v=\"143\", \"Not A(Brand\";v=\"24\"",
            //     "sec-ch-ua-mobile": "?0",
            //     "sec-ch-ua-platform": "macOS",
            //     "sec-fetch-dest": "empty",
            //     "sec-fetch-mode": "cors",
            //     "sec-fetch-site": "same-origin",
            //     'af-ac-enc-dat': DAT,
            //     'af-ac-enc-sz-token': TOKEN,
            //     'cookie': COOKIE
            // },
            body: {
                operationName: 'batchGetCustomLink',
                query: `
                    query batchGetCustomLink($linkParams: [CustomLinkParam!], $sourceCaller: SourceCaller){
                        batchCustomLink(linkParams: $linkParams, sourceCaller: $sourceCaller){
                        shortLink
                        longLink
                        failCode
                        }
                    }
                `,
                variables: {
                    linkParams: linkParams,
                    sourceCaller: 'CUSTOM_LINK_CALLER'
                }
            },
            json: true, // tự động JSON.stringify + parse response
            resolveWithFullResponse: false
        };
        let res = await rp(options)
        return res
    } catch (error) {
        console.error(error)
    }
}

// getLink("https://vn.shp.ee/aC1onWf")

module.exports = {
    getLink
}
