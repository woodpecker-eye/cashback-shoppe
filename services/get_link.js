const rp = require("request-promise")
const xlog = require("../utils/xlog")
const DAT = "13f345e83e9a0b4f"
const TOKEN = "0DSqX5hKM8XSbHKswn1Y8w==|VtLvF4Qc+u5NUWplSyGSlwqrhxmgf+Bn39JZuUaIXltxQ5YIcpRkqQ7gcTMFFTPJluQO00SetaU=|0QaOJoPUEAJMBYla|08|3"
const COOKIE = `_gcl_au=1.1.759986680.1766645207; _fbp=fb.1.1766645207136.422826856316156503; csrftoken=8JnDgJ5iDayNdOYGjThJJ36XHtAMtMvs; SPC_F=5NbmhAyjXVUfmTv9QqFCX1H6SHF6xPid; REC_T_ID=af37cb69-e15d-11f0-8949-fa943f6c8f5d; SPC_CLIENTID=NU5ibWhBeWpYVlVmxxldzxdifrevfbtn; _hjSessionUser_868286=eyJpZCI6ImUxMWYxZjlhLTBmZTEtNTMxNC04MDU0LTdlMDI4Yjg5MDI0ZCIsImNyZWF0ZWQiOjE3NjY2NDUyOTUwMjIsImV4aXN0aW5nIjp0cnVlfQ==; SPC_CDS_CHAT=20e29321-ac37-4fef-94d1-715df0161ff4; SC_DFP=BkQThUinvOFREzMgsEUTboOlYYrKYRQr; _med=refer; language=vi; _QPWSDCXHZQA=53223e08-eb20-4348-8553-dd51fc6feee5; REC7iLP4Q=8442b447-a1d0-4922-95c1-338ae5e6d322; _sapid=051badb7116585de004661b5e368ff120a53e65f9eda839291b54ca2; _med=affiliates; _fbc=fb.1.1768026530483.IwY2xjawPO0PBleHRuA2FlbQIxMABicmlkETFmamhMM05uYWRsNkZKSXc3c3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHo6KUNWVVc1a1s90fgUH1yA4N-lhcX1hLD65eBF7-m-qN3wDJIxzDbP8ywRY_aem_SGbWutC0HT8VG19U4UszOA; language=vi; SPC_SI=AVFTaQAAAABmdnZmUWVXWSQSRwAAAAAAUGtEaWZOSVQ=; _gid=GA1.2.509232297.1768122240; _hjSession_868286=eyJpZCI6IjVlMGM2NjI0LTEzYjUtNDQwNy1hMWFhLWE0OTM2MjBkM2IyZCIsImMiOjE3NjgxNDM5NDg4MjQsInMiOjAsInIiOjAsInNiIjowLCJzciI6MCwic2UiOjAsImZzIjowLCJzcCI6MH0=; SPC_ST=.aDhKSG1ncGZ4elN6TDhrb9Z84MZlOpvTWO2M4cPU2Hk7WBTOOFj04KTfpOiuC/C2qhddc95YUiQBEDspiljfvhfb8qvuZbMsr2L9JfV9jaO1FiGMqHx6Ap+gIE4dMn99YWbdJin3mIYYDkHRo9DYfLbMZTttRosA2MSrIsBWgaE4sxRrbOQMtYdqPBfxd3Dz9Rc6fBKvNyVUBQCkITD9WcNBbgLOJfR/bpWKXDrQ5UyaCDUN2azbyauKVRRjwGKo3gq5DAyTgOUwgzC4OlH/jQ==; SPC_U=1665184275; SPC_R_T_ID=xaEygST2xjZYrp03i90Vs6LzYhtARPdii3L6Wky88/No4Es3KZGXxBJuLVZ7q37F6yGZlTUx5+Ce2SFPU+9tEutgpjDIqQQmXXiSdQ1X4wbXJn4YxvkJDr8LuWpnA1sDDYeDjRRkyIoH6Gygnuwn8pOsg893CmEnkfA43GWo3ho=; SPC_R_T_IV=QzI3OEhzRFUySlpLU0NxMA==; SPC_T_ID=xaEygST2xjZYrp03i90Vs6LzYhtARPdii3L6Wky88/No4Es3KZGXxBJuLVZ7q37F6yGZlTUx5+Ce2SFPU+9tEutgpjDIqQQmXXiSdQ1X4wbXJn4YxvkJDr8LuWpnA1sDDYeDjRRkyIoH6Gygnuwn8pOsg893CmEnkfA43GWo3ho=; SPC_T_IV=QzI3OEhzRFUySlpLU0NxMA==; AMP_TOKEN=%24NOT_FOUND; _dc_gtm_UA-61914164-6=1; shopee_webUnique_ccd=35hm%2BUtDbrS16xxYUOjrIA%3D%3D%7CXdLvF4Qc%2Bu5NUWplSyGSlwqrhxmgf%2BBn39JZuZT%2BeVtxQ5YIcpRkqQ7gcTMFFTPJluQO00SetaUJfw%3D%3D%7C0QaOJoPUEAJMBYla%7C08%7C3; ds=841d209382613511d19dd495ef4bbd3c; _ga=GA1.2.1379595859.1766645295; SPC_EC=.a2pQU090VFFFbzM3SmtuVgbdpc/Gtz5mytc5O40e0dHDMv6Y3G+taG9lqREstLIdJivzuBtmBfcyeOOL4P4CygqfI+dCnWe0i2QjtFt5dE2sjuqFGqJ/uqjYajVNjNAoo/l2CI5CQ1Jr+JAPgM8HLy4R7TzeaISBUxhchp7oA9bxaniLGjyowSOkffvJaeGNhBhwq9dFZGmCkwX3O4qeghqqKu4qUMIgmvIgPXD95U1QPdWgNYUTAAqB+27kFlFByYKuMtPGku8Se3/o6eNDDA==; _ga_4GPP1ZXG63=GS2.1.s1768142754$o11$g1$t1768146582$j23$l0$h1746174352`

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

async function getLink(url, subId) {
    try {
        let destURL = await getRedirectURL(url)
        let urlParsed = new URL(destURL)

        let cleanUrl = urlParsed.origin + urlParsed.pathname

        const options = {
            method: 'POST',
            uri: 'https://affiliate.shopee.vn/api/v3/gql?q=batchCustomLink',
            headers: {
                'accept': 'application/json',
                'affiliate-program-type': '1',
                'content-type': 'application/json; charset=UTF-8',
                'origin': 'https://affiliate.shopee.vn',
                'referer': 'https://affiliate.shopee.vn/offer/custom_link',
                'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36',
                "sec-ch-ua": "Google Chrome\";v=\"143\", \"Chromium\";v=\"143\", \"Not A(Brand\";v=\"24\"",
                "sec-ch-ua-mobile": "?0",
                "sec-ch-ua-platform": "macOS",
                "sec-fetch-dest": "empty",
                "sec-fetch-mode": "cors",
                "sec-fetch-site": "same-origin",
                'af-ac-enc-dat': DAT,
                'af-ac-enc-sz-token': TOKEN,
                'cookie': COOKIE
            },
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
                    linkParams: [
                        {
                            originalLink: cleanUrl,
                            advancedLinkParams: {
                                subId1: subId
                            }
                        }
                    ],
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
