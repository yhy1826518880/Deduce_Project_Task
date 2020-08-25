<template>
  <div>
    <!--上传控件-->
    <uploader
      ref="uploader"
      :options="options"
      class="manage-uploader"
      @files-added="onFilesAdd"
      @file-success="onFileSuccess"
      :file-status-text="statusText"
    >
      <uploader-unsupport></uploader-unsupport>
      <!--<uploader-drop>
        <uploader-btn>选择文件</uploader-btn>
        <uploader-btn :attrs="attrs">select images</uploader-btn>
        <uploader-btn :directory="true">select folder</uploader-btn>
      </uploader-drop>-->
      <!--文件选择按钮-->
      <uploader-btn>选择文件</uploader-btn>
      <!--文件上传列表-->
      <uploader-list>
        <div class="file-panel" slot-scope="props">
          <ul class="file-list">
            <li v-for="file in props.fileList" :key="file.fileId">
              <uploader-file
                :class="'file_' + file.fileId"
                ref="files"
                :file="file"
                :list="true"
              ></uploader-file>
            </li>
          </ul>
        </div>
      </uploader-list>
    </uploader>

    <!--文件列表弹框-->
    <a-modal
      title="文件选择列表"
      :width="800"
      v-model="visible"
      @ok="startUpload"
      @cancel="cancelUpload"
    >
      <a-table
        :columns="columns"
        :dataSource="fileList"
        :pagination="false"
        :rowSelection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange
        }"
        rowKey="fileId"
      >
        <template slot="nameVerify" slot-scope="record">
          <a-input v-model="record.nameVerify"></a-input>
        </template>
        <template slot="operation" slot-scope="record">
          <a-button type="primary" @click="deleteFileFromList(record.fileId)"
            >删除</a-button
          >
        </template>
      </a-table>
      <!--<a-button type="primary" @click="startUpload">上传</a-button>-->
    </a-modal>
  </div>
</template>

<script>
import SparkMD5 from 'spark-md5'
import qs from 'qs'
import uniqId from 'uniqid'
import _ from 'lodash'

import { ACCESS_TOKEN } from '@/store/mutation-types'
import { hasMd5, mergeFile } from '@/api/files'
// import { hasMd5, mergeFile } from '@/api/gtsb_files'

export default {
  name: 'UploaderTool',

  data() {
    return {
      // 文件上传配置项
      options: {
        // target: 'http://192.168.31.232:23412/files/chunks',
        target: 'http://127.0.0.1:8080/apis/files/chunks',
        headers: {
          Authorization: `bearer${this.$ls.get(ACCESS_TOKEN)}`
        },
        chunkSize: 10 * 1024 * 1024,
        simultaneousUploads: 20,
        autoStart: false,
        testChunks: true
        // checkChunkUploadedByResponse: function(chunk, message) {
        //   let objMessage = JSON.parse(message)
        //   if (objMessage.skipUpload) {
        //     return true
        //   }
        //   return (objMessage.uploaded || []).indexOf(chunk.offset + 1) >= 0
        // }
      },
      attrs: {
        accept: 'image/*'
      },
      // 文件上传状态文字
      statusText: {
        success: '上传结束',
        error: '出错了',
        uploading: '上传中',
        paused: '暂停中',
        waiting: '等待中'
      },
      promiseList: [],
      // 用户选择后的文件列表
      fileList: [],
      columns: [
        {
          title: '文件名',
          dataIndex: 'name'
        },
        {
          title: '校验名',
          key: 'nameVerify',
          scopedSlots: { customRender: 'nameVerify' }
        },
        {
          title: '操作',
          key: 'actions',
          scopedSlots: { customRender: 'operation' }
        }
      ],
      selectedRowKeys: [],
      visible: false
    }
  },

  computed: {
    //Uploader实例
    uploader() {
      return this.$refs.uploader.uploader
    }
  },

  methods: {
    // 文件信息实例化工厂
    fileInfoFactory(fileObj) {
      let fileInfo = new Object()
      fileInfo.identifier = fileObj.uniqueIdentifier
      fileInfo.relativePath = '/' + fileObj.relativePath
      fileInfo.totalSize = fileObj.size
      fileInfo.filename = fileObj.name
      fileInfo.totalChunks = fileObj.chunks.length
      fileInfo.status = ''
      return fileInfo
    },

    // mergeFileFactory
    mergeFileFactory(fileInfo) {
      let P = new Promise((resolve, reject) => {
        // console.log(fileInfo)
        this.statusSet(fileInfo.fileId, 'merging')
        // mergeFile(fileInfo)
        mergeFile(qs.stringify(fileInfo))
          .then(res => {
            this.statusRemove(fileInfo.fileId)
            resolve(res.data.data.id)
          })
          .catch(() => {
            reject('error')
          })
      })
      return P
    },

    //批量添加文件
    onFilesAdd(files) {
      files.forEach(file => {
        let tag = uniqId.time()
        file.pause()
        file.fileId = tag
        file.nameVerify = file.name
      })
      this.fileList = _.cloneDeep(files)
      this.visible = true
    },

    // 计算文件MD5的方法
    computeMD5(file) {
      let fileReader = new FileReader()
      let time = new Date().getTime()
      let blobSlice = File.prototype.slice
      let currentChunk = 0
      const chunkSize = 10 * 1024 * 1000
      let chunks = Math.ceil(file.size / chunkSize)
      let spark = new SparkMD5.ArrayBuffer()

      this.statusSet(file.fileId, 'md5')
      //file.pause()

      this.$(`.file_${file.fileId} .uploader-file-actions`).css({
        display: 'none'
      })

      loadNext()
      fileReader.onload = e => {
        spark.append(e.target.result)
        if (currentChunk < chunks) {
          currentChunk++
          loadNext()
          // 实时展示MD5的计算进度
          this.$nextTick(() => {
            this.$(`.myStatus_${file.fileId}`).text(
              '文件校验中 ' + ((currentChunk / chunks) * 100).toFixed(0) + '%'
            )
          })
        } else {
          let md5 = spark.end()
          this.computeMD5Success(md5, file)
          console.log(
            `MD5计算完毕：${file.name} \nMD5：${md5} \n分片：${chunks} 大小:${
              file.size
            } 用时：${new Date().getTime() - time} ms`
          )
        }
      }
      fileReader.onerror = function() {
        this.$message.error(`文件${file.name}读取出错，请检查该文件`)
        file.cancel()
      }
      function loadNext() {
        let start = currentChunk * chunkSize
        let end = start + chunkSize >= file.size ? file.size : start + chunkSize
        fileReader.readAsArrayBuffer(blobSlice.call(file.file, start, end))
      }
    },

    // 计算MD5成功后的回调
    computeMD5Success(md5, file) {
      // 将自定义参数直接加载uploader实例的opts上
      Object.assign(this.uploader.opts, {
        query: {
          ...this.params
        }
      })
      file.uniqueIdentifier = md5
      let fileInfo = this.fileInfoFactory(file)
      this.statusRemove(file.fileId)
      this.$(`.file_${file.fileId} .uploader-file-actions`).css({
        display: 'unset'
      })
      hasMd5(md5).then(res => {
        // 如果文件md5已存在则应该直接upload
        if (res.data.data.id) {
          let resVal = ''
          let val = file.size
          if (val < 1024) {
            resVal = val + ' B'
          } else if (val >= 1024 && val < 1048576) {
            resVal = Math.round((val / 1024) * 10) / 10 + ' KB'
          } else if (val >= 1048576 && val < 1073741824) {
            resVal = Math.round((val / 1048576) * 10) / 10 + ' MB'
          } else if (val >= 1073741824) {
            resVal = Math.round((val / 1073741824) * 10) / 10 + ' G'
          }
          this.$('.manage-uploader .uploader-list ul').prepend(
            '<div status="success" class="uploader-file">' +
              '<div class="uploader-file-progress" style="transform: translateX(0%);"></div> ' +
              '<div class="uploader-file-info">' +
              '<div class="uploader-file-name"><i icon="unknown" class="uploader-file-icon"></i>' +
              file.name +
              '</div> <div class="uploader-file-size">' +
              resVal +
              '</div> <div class="uploader-file-meta"></div> <div class="uploader-file-status"><span>上传结束</span> <span style="display: none;"><span>100%</span> <em>0 bytes / s</em> <i></i></span></div> <div class="uploader-file-actions"><span class="uploader-file-pause"></span> <span class="uploader-file-resume">️</span> <span class="uploader-file-retry"></span> <span class="uploader-file-remove"></span></div></div></div>'
          )
          this.uploader.removeFile(file)
        } else {
          // 文件md5不存在则继续上传
          // this.statusRemove(file.fileId)
          file.resume()
        }
      })
      file.resume()
    },

    // 文件上传成功后的回调
    onFileSuccess() {
      console.log(arguments[1])
      let fileInfo = this.fileInfoFactory(arguments[1])
      fileInfo.fileId = arguments[1].fileId
      this.promiseList.push(this.mergeFileFactory(fileInfo))
    },

    // 文件勾选
    onSelectChange(selectedRowKeys) {
      console.log('selectedRowKeys changed: ', selectedRowKeys)
      this.selectedRowKeys = selectedRowKeys
      this.fileList.forEach(file => {
        if (selectedRowKeys.find(key => key === file.fileId)) {
          file.selected = true
        }
      })
    },

    // 从文件列表中删除文件
    deleteFileFromList(id) {
      if (id) {
        let targetIndex = this.fileList.findIndex(file => file.fileId === id)
        let targetFile = this.uploader.files.find(file => file.fileId === id)
        this.fileList.splice(targetIndex, 1)
        if (targetFile) {
          this.uploader.removeFile(targetFile)
        }
      }
    },

    // 开始文件上传流程
    startUpload() {
      this.fileList.forEach(file => {
        let fileObj = this.uploader.files.find(
          item => item.fileId === file.fileId
        )
        if (file.selected) {
          fileObj.name = file.nameVerify
          if (!this.verifyFileType(file.name, 'zip')) {
            alert('文件类型不合法！')
          }
          this.computeMD5(fileObj)
        } else {
          this.uploader.removeFile(fileObj)
        }
      })
      this.visible = false
    },

    // 新增的自定义的状态
    statusSet(id, status) {
      let statusMap = {
        md5: {
          text: '校验MD5中',
          bgc: '#f0f2f5'
        },
        merging: {
          text: '合并中',
          bgc: '#e2eeff'
        },
        transcoding: {
          text: '转码中',
          bgc: '#e2eeff'
        },
        failed: {
          text: '上传失败',
          bgc: '#e2eeff'
        }
      }
      this.$nextTick(() => {
        this.$(`<p class="myStatus_${id}"></p>`)
          .appendTo(`.file_${id} .uploader-file-status`)
          .css({
            position: 'absolute',
            top: '0',
            left: '0',
            right: '0',
            bottom: '0',
            zIndex: '1',
            backgroundColor: statusMap[status].bgc
          })
          .text(statusMap[status].text)
      })
    },

    // 移除状态
    statusRemove(id) {
      this.$nextTick(() => {
        this.$(`.myStatus_${id}`).remove()
      })
    },

    // 取消上传
    cancelUpload() {
      this.fileList = []
      this.uploader.cancel()
    },

    // 校验文件类型
    verifyFileType(name, type) {
      let strArr = name.split['.']
      let fileType
      if (_.isArray(strArr) && strArr.length > 0) {
        fileType = strArr[strArr.length - 1]
        return fileType === type
      } else {
        return false
      }
    }
  },

  watch: {}
}
</script>

<style scoped>
.manage-uploader ul {
  padding: 0;
  margin-top: 20px;
}
li {
  list-style: none;
}
.uploader-example {
  width: 880px;
  padding: 15px;
  margin: 40px auto 0;
  font-size: 12px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.4);
}
.uploader-example .uploader-btn {
  margin-right: 4px;
}
.uploader-example .uploader-list {
  max-height: 440px;
  overflow: auto;
  overflow-x: hidden;
  overflow-y: auto;
}
</style>
