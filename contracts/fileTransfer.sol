// SPDX-License-Identifier: MIT
pragma solidity ^0.5.16;
//pragma experimental ABIEncoderV2;

contract fileTransfer{
    struct OptFile{
        uint[] uploadFile;//已上传文件
        uint[] downloadFile;//已被下载过文件
        uint[] commentedFile;//被评论的文件
    }

    struct File{
        address owner;//资源发布者
        string nameWriter;//资源作者
        string style;//资源类型
        uint uploadAge;//上传时间
        string intro;//资源简介
        string cover;//资源封面

        uint score;//资源评分
        uint comment;//资源评论个数

        mapping(uint => Comment) comments;//评价列表
        mapping(uint => DownloadNums) downloadNums;//被下载次数
    }

    struct  Comment{
        address commentator; //评论者
        uint date; // 评论日期
        uint score; //评分
        string content; //评论正文
    }

    struct DownloadNums{
        uint downloadNum; //下载次数
    }

    File[] files;
    uint tempNum = 1;
    mapping(address => OptFile) FilesPool;
    
    //发布资源成功
    event publishFileSuccess(
        uint id, 
        string nameWriter, 
        string style, 
        uint uploadAge,
        string intro, 
        string cover
        );

    //资源评价成功
    event evaluateSuccess(uint id,address addr,uint score);

    //下载成功
    event downloadSuccess(uint id, address addr);

    //获取资源信息
    event getFilesInfoSuccess(
        address fileOwner, 
        string nameWriter, 
        string style, 
        uint uploadAge,
        string intro,
        string cover, 
        uint score, 
        uint comment
    );

    //获取下载过的资源列表
    event getDownloadFileSuccess(uint[] downloadFilesID);

    //获取被评论过的资源列表
    event getCommentFileSuccess(uint[]  commentedFilesId);

    //获取上传的资源列表
    event getPublishFilesuccess(uint[] uploadFilesId);

    //获取资源数量
    event getFileLengthSuccess(uint filesLength);

    //获得评价数量
    event getCommentLengthSuccess(uint filesCommentsId);

    //获取下载数量
    event getDownloadNumsSuccess(uint downloadNum);

    //获取评价消息
    event getCommentInfoSuccess(address commentator,uint date , uint score , string content);

    // 是否已经评价 通过遍历实现
    event isEvaluatedSuccess(bool Evaluated);

    //是否为本账户下文件
    event isMyFileSuccess(bool myFile);

    //获取下载过的资源列表
    function getDownloadFile() public {
        emit getDownloadFileSuccess(FilesPool[msg.sender].downloadFile);
    }


    //获取被评论过的资源列表
    function getCommentFile() public  {
        emit getCommentFileSuccess(FilesPool[msg.sender].commentedFile);
    }
 

    //获取上传的资源列表
    function getPublishFile() public  {
        emit getPublishFilesuccess(FilesPool[msg.sender].uploadFile);
    }

    //获取资源数量
    function getFileLength() public{
        emit getFileLengthSuccess(files.length);
    }

    //获得评价数量
    function getCommentLength(uint id) public {
        emit getCommentLengthSuccess(files[id].comment);
    }

    //获取下载数量
    function getDownloadNums(uint id) public {
        File storage file = files[id];
        DownloadNums storage d = file.downloadNums[0];
        emit getDownloadNumsSuccess(d.downloadNum);
    }

    //获取资源信息
    function getFilesInfo(uint id) public  {
        require(id < files.length);
        //获取图书,载入合约
        File storage file = files[id];
        //uint storage id = id;
        emit getFilesInfoSuccess(file.owner,file.nameWriter,file.style,file.uploadAge,file.intro,file.cover,file.score,file.comment);
    }

    //获取评价消息
    function getCommentInfo(uint fileId,uint commentId) public  {
        require(fileId < files.length);
        require(commentId < files[fileId].comment);
        Comment storage c = files[fileId].comments[commentId];
        emit getCommentInfoSuccess(c.commentator, c.date, c.score,c.content);
    }

    // 是否已经评价 通过遍历实现
    function isEvaluated(uint id) public {
        File storage file = files[id];
        for(uint i = 0; i < file.comment; i++)
            if(file.comments[i].commentator == msg.sender)
                //return true; // 已经评价
                emit isEvaluatedSuccess(true);
        //return false; // 尚未评价
        emit isEvaluatedSuccess(false);
    }

    //是否为本账户下文件
    function isMyFile(uint id) public {
        File storage file = files[id];
        if(file.owner == msg.sender)
            //return true;
            emit isMyFileSuccess(true);
        //return false;
        emit isMyFileSuccess(false);
    }

    //发布资源
    function publishFileInfo(
        string memory nameWriter, 
        string memory style, 
        uint,
        string memory intro,
        string memory cover) 
        public {
        uint id = files.length;
        File memory file = File(msg.sender,nameWriter,style,block.timestamp,intro,cover,0,0);
        files.push(file);
        FilesPool[msg.sender].uploadFile.push(id);
        emit publishFileSuccess(id,file.nameWriter,file.style,file.uploadAge,file.intro,file.cover);
    }

    //评价资源
    function evaluate(uint id, uint score, string memory content) public{
        require(id < files.length);
        // 读取合约
        File storage file = files[id];
        //require(file.owner != msg.sender && !isEvaluated(id)); // 限制条件
        require(0 <= score && score <= 10); // 合法条件
        // 记录评价
        file.score += score;
        file.comments[file.comment++] = Comment(msg.sender, now, score, content);
        FilesPool[msg.sender].commentedFile.push(id);
        emit evaluateSuccess(id, msg.sender, file.score);
    }

    //下载资源
    function downloadFile(uint id) public{
        require(id < files.length);
        File storage file = files[id];
        //require(file.owner != msg.sender && !isBorrowed(id)); // 限制条件
        file.downloadNums[0] = DownloadNums(tempNum++);
        FilesPool[msg.sender].downloadFile.push(id);
        emit  downloadSuccess(id, msg.sender);

    }

    //字符串比较
    function hashCompareInternal(string memory a, string memory b) internal returns (bool) {
        return keccak256(abi.encodePacked(a)) == keccak256(abi.encodePacked(b));
    }

    function() external {
        revert();
    }
}
