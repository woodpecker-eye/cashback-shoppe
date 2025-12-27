const rp = require("request-promise")

const DAT = "1f7328e1bcbaf515"
const TOKEN = "3lyX1mEpryvzk5T3etBG6A==|8tLvF4Qc+u5NUWplSyGSlwqrhxmgf+Bn39JZufCija1xQ5YIcpRkqQ7gcTMFFTPJluQO00SetaU=|0QaOJoPUEAJMBYla|08|3"
const COOKIE = `_gcl_au=1.1.759986680.1766645207; _fbp=fb.1.1766645207136.422826856316156503; csrftoken=8JnDgJ5iDayNdOYGjThJJ36XHtAMtMvs; SPC_F=5NbmhAyjXVUfmTv9QqFCX1H6SHF6xPid; REC_T_ID=af37cb69-e15d-11f0-8949-fa943f6c8f5d; SPC_CLIENTID=NU5ibWhBeWpYVlVmxxldzxdifrevfbtn; SPC_SI=GoMdaQAAAABralllbFlLUzyaGwMAAAAAM1V2MktqTEY=; _hjSessionUser_868286=eyJpZCI6ImUxMWYxZjlhLTBmZTEtNTMxNC04MDU0LTdlMDI4Yjg5MDI0ZCIsImNyZWF0ZWQiOjE3NjY2NDUyOTUwMjIsImV4aXN0aW5nIjp0cnVlfQ==; _hjSession_868286=eyJpZCI6ImU0NTA1M2U3LWJlM2ItNDJmNC1hODA4LTE2ODQ5Y2Y1NWIzOSIsImMiOjE3NjY3NjMwMDMzODIsInMiOjAsInIiOjAsInNiIjowLCJzciI6MCwic2UiOjAsImZzIjowLCJzcCI6MH0=; _gid=GA1.2.1034714454.1766763004; SPC_ST=.MzB2MUxyVmVKNUdCZG9BbRJNtiUDMJ4uUsCxt6PZgeqliQ6SUsgnrUF1bcuhb06DXJvnac4zZKYuNmKug3oCP1GMKBFpWFMhPtnIeO5EcDcSHMfc8q+NGfqKZUmf0NcvT7dFkGhQfKLngfVYqVFC3fy/XRt7X+bJjDKJCM93xr3G7fAbuXUFssU44mPUPdHT3q7kzv4sBdhLHLL5s2morLrOPL3AEzouPjpq5ErwwRiKQh+Ty+cRsxls+SGYEG/Jkbucju+wgnSb3CvKYtjJPw==; SPC_U=1665184275; SPC_R_T_ID=yTfsr+f69OJjf2P+8B4aS54Kx9n6CV3kcK57RI0YWOJUDeGK2ZAjWHpp2hWi4XlDGVyCJkfXFYikzgIGjbLB9jiRgb2HDiN0EcJtm63upjFKZL+2pxFrId3tonK/z0CDIcXhLh2gFJJ8UEqxnb/+EdFsGrWOTdKvnscUcbLKCoM=; SPC_R_T_IV=bjlYTWhqRXZxcU1SSTVlZA==; SPC_T_ID=yTfsr+f69OJjf2P+8B4aS54Kx9n6CV3kcK57RI0YWOJUDeGK2ZAjWHpp2hWi4XlDGVyCJkfXFYikzgIGjbLB9jiRgb2HDiN0EcJtm63upjFKZL+2pxFrId3tonK/z0CDIcXhLh2gFJJ8UEqxnb/+EdFsGrWOTdKvnscUcbLKCoM=; SPC_T_IV=bjlYTWhqRXZxcU1SSTVlZA==; SPC_CDS_CHAT=20e29321-ac37-4fef-94d1-715df0161ff4; SPC_SC_SESSION=gc906H5VRdzHSkV+AhEUxrwWWDdSFueX7NFSW9N0Qqh1XcTcLFsbiE2JHnTj1AZVLG0oSp3raOUQeKm5jNpm5TguhGZgHV29Mmo3H1PdmsM2vTgGqvlDrP09q+zbOWXEOtFaEFTMM/UK5LRFot9+aGnsgCOvEV1sXW/hmc1EJ+S7F6x1qs90HhlkY7hNiF2GGoMvT+wJDPxAEwqkUBR5EQA==_1_1665184275; SPC_SC_MAIN_SHOP_SA_UD=0; SPC_STK=BFYaW3sBw/2SZinOMtebm37y9qtcMTDn+8QNVMj6ReIjkAB53u3j6L2wqStoJpvj8lvVeAIIdcB7d1KXmuBZrm2knMC45XS1zftzk3CYb0jh85n/bXVgjfs9fumbjULnmF+FoCJJnTEf+GCI3XxuL3cXAmutRAH9ILBr/IZkcGgALG+91F8fDaiN39XvWtcdie0zDgQvQqhul+aVIaKUCf0VI6n3jhCyLsJ4/OxBUV/8ejIv/9l3IRZg7mSSG45BJ6zRtNhAGYVquPacX5kQlwCwztzdZWGdDXWftpcbm/YX5lV8JFve48/O30IayuyZYc06fxcBnx/3AL51ahPK+H/lPBcjz6v5AWwiNhur6ite/edEfUnR9NZudQeephj9uP84tiLrhfJHdtdHaDGvYV98Hlgh+N5jwX0o9dzfhW8=; SC_DFP=BkQThUinvOFREzMgsEUTboOlYYrKYRQr; CTOKEN=M%2FIRHuJwEfCDEWppLKWLzg%3D%3D; _med=refer; language=vi; _QPWSDCXHZQA=53223e08-eb20-4348-8553-dd51fc6feee5; REC7iLP4Q=8442b447-a1d0-4922-95c1-338ae5e6d322; _sapid=051badb7116585de004661b5e368ff120a53e65f9eda839291b54ca2; _med=affiliates; _ga=GA1.1.1379595859.1766645295; _ga_4GPP1ZXG63=GS2.1.s1766763003$o3$g1$t1766766133$j1$l0$h647442844; shopee_webUnique_ccd=rsfceB%2BurCxLMY3nljyFgw%3D%3D%7CCtLvF4Qc%2Bu5NUWplSyGSlwqrhxmgf%2BBn39JZuQ8Isa1xQ5YIcpRkqQ7gcTMFFTPJluQO00SetaU%3D%7C0QaOJoPUEAJMBYla%7C08%7C3; ds=23f49a25ec75fd5bcc7d2c4726cc0e52; SPC_EC=.UjNTRHAyNW1aM0w0RWdwdhcqMTmYu3boP/f0rMzkHW9JuzLGGFh2v3kU6/qfOoBCx0ohTAuYTOVx3eIKjxDiryRHkFckaCd1KZJcbJXSXMyFaEE9awjgM6pdrYTyAnOAZIysQXpo72FqgEnocYcxQewhJ0h40NrQyz8/gdjc0Mnr4M+PZmS5EN09IrjMAmt5z1Ven/1nGvB35zvxgYEiAK7UwOzLNBVYbpNZPxcgNX0BTRfWGpmCBuzxzbEz+Yv2TzYveSVmyjbgPBHbi2tqAQ==`

async function getLink(url, subId) {
    try {
        const options = {
            method: 'POST',
            uri: 'https://affiliate.shopee.vn/api/v3/gql?q=batchCustomLink',
            headers: {
                'accept': 'application/json',
                'affiliate-program-type': '1',
                'content-type': 'application/json; charset=UTF-8',
                'origin': 'https://affiliate.shopee.vn',
                'referer': 'https://affiliate.shopee.vn/offer/custom_link',
                'user-agent':
                    'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36',

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
                            originalLink:
                                url,
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


module.exports = {
    getLink
}
