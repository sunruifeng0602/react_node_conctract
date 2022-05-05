const path = require('path')
const fs  = require('fs')

const { create , globSource }= require('ipfs-http-client')
const ipfs = create()

const ReadFile = (path,encoding) =>new Promise(async (resolve,reject) =>{
    fs.readFile(path,encoding,async (err,data) =>{
        if(err){
            console.error(err)
            reject(err)
        }else{
            resolve(data)
            //console.log(data)
        }
    })
})

const getFileFromIpfs = (pashHash) => {
    return new Promise(async (resolve,reject) =>{
        for await (const fileGet of ipfs.get(pashHash)) {
            console.log(fileGet.path)
            // const content = new BufferList()
            // for await (const chunk of file.content) {
            // content.append(chunk)
            // }
            // console.log(content.toString())
            // resolve(content)
        }
    })
}

const uploadFile = async (ctx,next) =>{

    try{
        const fileBuffer = await ReadFile(ctx.request.files.resource.filepath,'utf-8')
        console.log(fileBuffer)
        const file = await ipfs.add(fileBuffer)
        //console.log(file.path)
        //console.log(await getFileFromIpfs(file.cid))
        ctx.body = file.path
    }catch(err){
        console.error(err)
        return 
    }
    await next()
}

const downloadFile = async (ctx,next) => {

    await next()
} 

module.exports = {
    uploadFile
}