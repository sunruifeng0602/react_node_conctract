const path = require('path')
const fs  = require('fs')
const buffer = require('buffer')

const { create , globSource }= require('ipfs-http-client')
const send = require('koa-send')
const mime = require('mime')

const fileType = require('../model/filetype.model')

const ipfs = create()

const ReadFile = (path) =>new Promise(async (resolve,reject) =>{
    fs.readFile(path, (err,data) =>{
        if(err){
            console.error(err)
            reject(err)
        }else{
            resolve(data)
            //console.log(data)
        }
    })
})

const WriteFile = (path,buffer,encoding) =>{
    return new Promise(async (resolve,reject) =>{
        fs.writeFile(path,buffer,encoding ,(err)=>{
            if(err){
                reject(err)
            }else{
                resolve(path)
            }
        })
    })
}

const getUploadRequest = async(ctx,next) =>{
    try{
        //console.log(ctx.request.files[Object.keys(ctx.request.files)[0]])
        ctx.body = {
            code : 0,
            message : "上传成功",
            result : ctx.request.files[Object.keys(ctx.request.files)[0]]
        }
    }catch(err){
        console.error(err)
    }

}

const uploadFile = async (ctx,next) =>{

    //console.log(ctx.request.body)
    try{
        //console.log(ctx.request.body)
        const fileBuffer = await ReadFile(ctx.request.body.resource.filepath)
        const file = await ipfs.add(fileBuffer)
        const cid = file.path
        const length = ctx.request.body.resource.originalFilename.split('.').length
        const type = ctx.request.body.resource.originalFilename.split('.')[length-1]
        await fileType.create({cid,type})
        ctx.body = file.path
    }catch(err){
        console.error(err)
        return 
    }
    await next()
}

const downloadFile = async (ctx,next) => {
    try{
        //console.log(ctx.request.body.path)
        const cid = ctx.request.body.path
        const whereOpt = {}
        cid && Object.assign(whereOpt, {cid})
        const res = await fileType.findOne({
            attributes : [ 'cid', 'type'],
            where : whereOpt
        })
        
        const chunks = []
        for await (const chunk of ipfs.cat(ctx.request.body.path)) {  
            chunks.push(chunk)
        }
        file_path_name = __dirname + '/download' + '/' + ctx.request.body.path + '.'+ res.dataValues.type
        const fileDownloadPath = await WriteFile(file_path_name,Buffer.concat(chunks),'utf8')
        await send(ctx, '/src/'+ fileDownloadPath.split('\\')[fileDownloadPath.split('\\').length-1]);
    }catch(err){
        console.error(err)
        return
    }

    await next()
} 

module.exports = {
    uploadFile,
    downloadFile,
    getUploadRequest
}