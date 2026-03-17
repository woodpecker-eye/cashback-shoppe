const rp = require("request-promise")
const xlog = require("../utils/xlog")
const DAT = "13f345e83e9a0b4f"
const TOKEN = "0DSqX5hKM8XSbHKswn1Y8w==|VtLvF4Qc+u5NUWplSyGSlwqrhxmgf+Bn39JZuUaIXltxQ5YIcpRkqQ7gcTMFFTPJluQO00SetaU=|0QaOJoPUEAJMBYla|08|3"
const COOKIE = `_gcl_au=1.1.759986680.1766645207; _fbp=fb.1.1766645207136.422826856316156503; csrftoken=8JnDgJ5iDayNdOYGjThJJ36XHtAMtMvs; SPC_F=5NbmhAyjXVUfmTv9QqFCX1H6SHF6xPid; REC_T_ID=af37cb69-e15d-11f0-8949-fa943f6c8f5d; SPC_CLIENTID=NU5ibWhBeWpYVlVmxxldzxdifrevfbtn; _hjSessionUser_868286=eyJpZCI6ImUxMWYxZjlhLTBmZTEtNTMxNC04MDU0LTdlMDI4Yjg5MDI0ZCIsImNyZWF0ZWQiOjE3NjY2NDUyOTUwMjIsImV4aXN0aW5nIjp0cnVlfQ==; SPC_CDS_CHAT=20e29321-ac37-4fef-94d1-715df0161ff4; SC_DFP=BkQThUinvOFREzMgsEUTboOlYYrKYRQr; _med=refer; language=vi; _QPWSDCXHZQA=53223e08-eb20-4348-8553-dd51fc6feee5; REC7iLP4Q=8442b447-a1d0-4922-95c1-338ae5e6d322; _sapid=051badb7116585de004661b5e368ff120a53e65f9eda839291b54ca2; _med=affiliates; _fbc=fb.1.1768026530483.IwY2xjawPO0PBleHRuA2FlbQIxMABicmlkETFmamhMM05uYWRsNkZKSXc3c3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHo6KUNWVVc1a1s90fgUH1yA4N-lhcX1hLD65eBF7-m-qN3wDJIxzDbP8ywRY_aem_SGbWutC0HT8VG19U4UszOA; language=vi; SPC_SI=AVFTaQAAAABmdnZmUWVXWSQSRwAAAAAAUGtEaWZOSVQ=; _gid=GA1.2.509232297.1768122240; _hjSession_868286=eyJpZCI6IjVlMGM2NjI0LTEzYjUtNDQwNy1hMWFhLWE0OTM2MjBkM2IyZCIsImMiOjE3NjgxNDM5NDg4MjQsInMiOjAsInIiOjAsInNiIjowLCJzciI6MCwic2UiOjAsImZzIjowLCJzcCI6MH0=; SPC_ST=.aDhKSG1ncGZ4elN6TDhrb9Z84MZlOpvTWO2M4cPU2Hk7WBTOOFj04KTfpOiuC/C2qhddc95YUiQBEDspiljfvhfb8qvuZbMsr2L9JfV9jaO1FiGMqHx6Ap+gIE4dMn99YWbdJin3mIYYDkHRo9DYfLbMZTttRosA2MSrIsBWgaE4sxRrbOQMtYdqPBfxd3Dz9Rc6fBKvNyVUBQCkITD9WcNBbgLOJfR/bpWKXDrQ5UyaCDUN2azbyauKVRRjwGKo3gq5DAyTgOUwgzC4OlH/jQ==; SPC_U=1665184275; SPC_R_T_ID=xaEygST2xjZYrp03i90Vs6LzYhtARPdii3L6Wky88/No4Es3KZGXxBJuLVZ7q37F6yGZlTUx5+Ce2SFPU+9tEutgpjDIqQQmXXiSdQ1X4wbXJn4YxvkJDr8LuWpnA1sDDYeDjRRkyIoH6Gygnuwn8pOsg893CmEnkfA43GWo3ho=; SPC_R_T_IV=QzI3OEhzRFUySlpLU0NxMA==; SPC_T_ID=xaEygST2xjZYrp03i90Vs6LzYhtARPdii3L6Wky88/No4Es3KZGXxBJuLVZ7q37F6yGZlTUx5+Ce2SFPU+9tEutgpjDIqQQmXXiSdQ1X4wbXJn4YxvkJDr8LuWpnA1sDDYeDjRRkyIoH6Gygnuwn8pOsg893CmEnkfA43GWo3ho=; SPC_T_IV=QzI3OEhzRFUySlpLU0NxMA==; AMP_TOKEN=%24NOT_FOUND; _dc_gtm_UA-61914164-6=1; shopee_webUnique_ccd=35hm%2BUtDbrS16xxYUOjrIA%3D%3D%7CXdLvF4Qc%2Bu5NUWplSyGSlwqrhxmgf%2BBn39JZuZT%2BeVtxQ5YIcpRkqQ7gcTMFFTPJluQO00SetaUJfw%3D%3D%7C0QaOJoPUEAJMBYla%7C08%7C3; ds=841d209382613511d19dd495ef4bbd3c; _ga=GA1.2.1379595859.1766645295; SPC_EC=.a2pQU090VFFFbzM3SmtuVgbdpc/Gtz5mytc5O40e0dHDMv6Y3G+taG9lqREstLIdJivzuBtmBfcyeOOL4P4CygqfI+dCnWe0i2QjtFt5dE2sjuqFGqJ/uqjYajVNjNAoo/l2CI5CQ1Jr+JAPgM8HLy4R7TzeaISBUxhchp7oA9bxaniLGjyowSOkffvJaeGNhBhwq9dFZGmCkwX3O4qeghqqKu4qUMIgmvIgPXD95U1QPdWgNYUTAAqB+27kFlFByYKuMtPGku8Se3/o6eNDDA==; _ga_4GPP1ZXG63=GS2.1.s1768142754$o11$g1$t1768146582$j23$l0$h1746174352`


const FETCH_SAMPLE =
    `
curl 'https://affiliate.shopee.vn/api/v3/gql?q=batchCustomLink' \
  -H 'accept: application/json, text/plain, */*' \
  -H 'accept-language: vi-VN,vi;q=0.9,en-US;q=0.8,en;q=0.7' \
  -H 'af-ac-enc-dat: c75fa9f8a0e96fcb' \
  -H 'af-ac-enc-sz-token: JU0Jz62EFQs4EbRHx2wiLg==|kdPvF4Qc+u5NUWplSyGSlwqrhxmgf+Bn39JZuROYf1lxQ5YIcpRkqQ7gcTMFFTPJluQO00SetaUJfw==|0QaOJoPUEAJMBYla|08|3' \
  -H 'affiliate-program-type: 1' \
  -H 'content-type: application/json; charset=UTF-8' \
  -b '_gcl_au=1.1.759986680.1766645207; _fbp=fb.1.1766645207136.422826856316156503; csrftoken=8JnDgJ5iDayNdOYGjThJJ36XHtAMtMvs; SPC_F=5NbmhAyjXVUfmTv9QqFCX1H6SHF6xPid; REC_T_ID=af37cb69-e15d-11f0-8949-fa943f6c8f5d; SPC_CLIENTID=NU5ibWhBeWpYVlVmxxldzxdifrevfbtn; _hjSessionUser_868286=eyJpZCI6ImUxMWYxZjlhLTBmZTEtNTMxNC04MDU0LTdlMDI4Yjg5MDI0ZCIsImNyZWF0ZWQiOjE3NjY2NDUyOTUwMjIsImV4aXN0aW5nIjp0cnVlfQ==; SPC_CDS_CHAT=20e29321-ac37-4fef-94d1-715df0161ff4; SC_DFP=BkQThUinvOFREzMgsEUTboOlYYrKYRQr; _med=refer; language=vi; _QPWSDCXHZQA=53223e08-eb20-4348-8553-dd51fc6feee5; REC7iLP4Q=8442b447-a1d0-4922-95c1-338ae5e6d322; _sapid=051badb7116585de004661b5e368ff120a53e65f9eda839291b54ca2; _med=affiliates; _fbc=fb.1.1768026530483.IwY2xjawPO0PBleHRuA2FlbQIxMABicmlkETFmamhMM05uYWRsNkZKSXc3c3J0YwZhcHBfaWQQMjIyMDM5MTc4ODIwMDg5MgABHo6KUNWVVc1a1s90fgUH1yA4N-lhcX1hLD65eBF7-m-qN3wDJIxzDbP8ywRY_aem_SGbWutC0HT8VG19U4UszOA; language=vi; SPC_SI=AVFTaQAAAABmdnZmUWVXWSQSRwAAAAAAUGtEaWZOSVQ=; _gid=GA1.2.509232297.1768122240; SPC_ST=.aDhKSG1ncGZ4elN6TDhrb9Z84MZlOpvTWO2M4cPU2Hk7WBTOOFj04KTfpOiuC/C2qhddc95YUiQBEDspiljfvhfb8qvuZbMsr2L9JfV9jaO1FiGMqHx6Ap+gIE4dMn99YWbdJin3mIYYDkHRo9DYfLbMZTttRosA2MSrIsBWgaE4sxRrbOQMtYdqPBfxd3Dz9Rc6fBKvNyVUBQCkITD9WcNBbgLOJfR/bpWKXDrQ5UyaCDUN2azbyauKVRRjwGKo3gq5DAyTgOUwgzC4OlH/jQ==; SPC_U=1665184275; SPC_R_T_ID=xaEygST2xjZYrp03i90Vs6LzYhtARPdii3L6Wky88/No4Es3KZGXxBJuLVZ7q37F6yGZlTUx5+Ce2SFPU+9tEutgpjDIqQQmXXiSdQ1X4wbXJn4YxvkJDr8LuWpnA1sDDYeDjRRkyIoH6Gygnuwn8pOsg893CmEnkfA43GWo3ho=; SPC_R_T_IV=QzI3OEhzRFUySlpLU0NxMA==; SPC_T_ID=xaEygST2xjZYrp03i90Vs6LzYhtARPdii3L6Wky88/No4Es3KZGXxBJuLVZ7q37F6yGZlTUx5+Ce2SFPU+9tEutgpjDIqQQmXXiSdQ1X4wbXJn4YxvkJDr8LuWpnA1sDDYeDjRRkyIoH6Gygnuwn8pOsg893CmEnkfA43GWo3ho=; SPC_T_IV=QzI3OEhzRFUySlpLU0NxMA==; _hjSession_868286=eyJpZCI6IjBlYjg2YjY1LThkZWUtNDZlMS1iMzI2LTdiOTAwZDJiN2RmNiIsImMiOjE3NjgyMzYyMzY3ODUsInMiOjAsInIiOjAsInNiIjowLCJzciI6MCwic2UiOjAsImZzIjowLCJzcCI6MH0=; AMP_TOKEN=%24NOT_FOUND; _dc_gtm_UA-61914164-6=1; shopee_webUnique_ccd=vhvzhShGX4JM6Y0VAFhGbw%3D%3D%7Cv9PvF4Qc%2Bu5NUWplSyGSlwqrhxmgf%2BBn39JZuT0i4UVxQ5YIcpRkqQ7gcTMFFTPJluQO00SetaUJfw%3D%3D%7C0QaOJoPUEAJMBYla%7C08%7C3; ds=d62261f68963e5bb42bd8ede164b33fa; _ga=GA1.1.1379595859.1766645295; SPC_EC=.OE9DaXhIYVJqSGd0MzBNU3oJljiQwjFPqvk/I2gVGnsD9nI/yq3WGyl5G78gzXILLBDOLLbTM2HxXn9sbsLcW7rtYvlRad1m8i6TMIFh70pBG13K6wUcUNAKwTVC7hIir0CALMSWTtww/F7p9BOKIL67yfTywf+YRxFTKuwJBzRVMum7iDdjLhOn5/AP7o9onhq76KW0WPMv77RCGv29LGJRHBd2KCEXts6KOlnM0sBZ77rLNQI9brfpXmIklG0+ckUI+8nhF/bqk9MH4LL7vA==; _ga_4GPP1ZXG63=GS2.1.s1768236236$o14$g1$t1768237314$j38$l0$h562571507' \
  -H 'csrf-token: eGRF1ynw-FNSbTmfWRootkLyR-3Eq1CArtCg' \
  -H 'origin: https://affiliate.shopee.vn' \
  -H 'priority: u=1, i' \
  -H 'referer: https://affiliate.shopee.vn/offer/custom_link' \
  -H 'sec-ch-ua: "Google Chrome";v="143", "Chromium";v="143", "Not A(Brand";v="24"' \
  -H 'sec-ch-ua-mobile: ?0' \
  -H 'sec-ch-ua-platform: "macOS"' \
  -H 'sec-fetch-dest: empty' \
  -H 'sec-fetch-mode: cors' \
  -H 'sec-fetch-site: same-origin' \
  -H 'user-agent: Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36' \
  -H 'x-sap-ri: 0529656989c4147ee28bec3705018f38ecd3046e90d079249355' \
  -H 'x-sap-sec: B22o4Xq+ABqguR7PqB1PqRyP4BViq0dPuBVJqd4PhWVaq0TP1W1ZqKaPEBvFq+TPlBVmqL1PjBvWqKoPUW1Lqd1PsBVoqK7POB18qc+PmfVpqRyPxB1jqQTPbBVyqN4PnW1eqQ7PCOvdqMaPeB1UqNkPgB1mqRYPsf1tqKiPHfvPq+aPaBVzqB1P7BTPqB1PqBuGEEB1qB1P3+JeyJccqf1PqB1PnZW8clbPqf1PTB9Pq3t1u+9Pq2iEwBTPqB1PAITPqQVPqBU++X7rqB1PzujwjB1Pq/SrqB1MqW1P0ZRRSB1PqRHeqO1PAB9PqB1PQL3yHw/DqB1PNdPYmx+tqO1PqBUbnjaOqBVrrW1zxyafcdUMq7M3qf1PqBUucB7kqBUPqO1PqLzT0a+1JTuO6NpYqBvz+akPqBVeeds80KscEoIqVtOgcm6s7Eq8wUT0xzPR38ZpX05wtTKaFyuMJLcLUy8xT48OWuYbPFNa/GapP9LXh9tImJGQ++XDOZmQ4dljqjfqe3vnGto7CYod7HqdZowK9SBW0BsUeTsp1dunRDGHKYTNiog22gvmxE20jlFKRXc/GRlYU/CpT8DFiXEoWVk2TrBVfk7KuHklQDl+iQmctT4LTW1pmNDOf1dPCkP8YgNyTX6D/QFbcETSVQd0CtKBeCmkv0QvCucPlpbrkhMi8zwWooGtsJoYPSjbsKx/nv5ELoOrwOLA5zyvx9g7KyD0qBSPqB18iBG2TidOEfaPqBVlpGyvkO1Pq0HRqfJ603zDlS6OEsx3wf9oSml62jRq+NNjrbOZRofgA9i17koInOrlCpm0r4th+Y4ika619GStTFCJCLooFJbzhhcBArhK+iqd0MNY+bSB/b0Hhtb5nBQilDdEklynaEB++1UbHS/3Icc8FuC5eHCB21y4cHYPESI+myZIErR1nrxOI7RFnfH5yrTqofksL5noSaucBVQ4BLfuyril/3gxqB1PuB1PqMzEE47HqB1PLEdT1Ii8V48eK+iBYk9PqB1PqB1PqB1Pwf1Pq2EjGy7iT89+ss6DwJ4ilg/b4Q7PDAzSTtG3xDYLzFd8eKdiqNj9CXQ33QacblXsFeG3ZQdIiFdfSL58wPTigrfohTVSvN4PqB1PqB1PqB1P1W1PqLE2gDo2lm4Ae3AwCMp9ZjgdsyiPXB1PqL3pFgXk9J5T6/61VQdbtXv32+aKVR1pmvOKD8wSXF4ye/0GVO1PqB1GqB1PKEoGYgjyx4GhLr+QGiz7AvheFPzP9mpTe/+avMVlnyUser7+19YHA/vKgIuH9BA80/2qVIAgxy1PqB1PnB1PqMP49h8v1jrNqB1PqB1PqB1tqB1PiwrHGxqJmJPpZMJ7wj2DZt/ZoJPl2MtL5Wa5KMVyPZzA0UauO4JzXfSPqBUCcBo8zg9YafSPqB1CijoiDdagjO1PqBv=' \
  -H 'x-sz-sdk-version: 1.12.21' \
  --data-raw $'{"operationName":"batchGetCustomLink","query":"\\n    query batchGetCustomLink($linkParams: [CustomLinkParam\u0021], $sourceCaller: SourceCaller){\\n      batchCustomLink(linkParams: $linkParams, sourceCaller: $sourceCaller){\\n        shortLink\\n        longLink\\n        failCode\\n      }\\n    }\\n    ","variables":{"linkParams":[{"originalLink":"https://shopee.vn/%C3%81O-C%E1%BB%94-TR%C3%92N-H%E1%BB%9E-L%C6%AFNG-D%C3%82Y-XO%E1%BA%AEN-PH%C3%8DA-SAU-i.233248975.25132624779","advancedLinkParams":{"subId1":"aaa"}}],"sourceCaller":"CUSTOM_LINK_CALLER"}}'
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
