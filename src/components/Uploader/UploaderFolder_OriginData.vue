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
      <uploader-btn :directory="true">选择文件</uploader-btn>
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

    <!--文件树结构预览-->
    <a-tree :treeData="fileList">
      <template slot="title" slot-scope="record">
        <span class="cus-tree-text">
          <span style="color: #fff;">
            <svg-icon
              icon-class="folder"
              v-if="record.isFolder === true"
            ></svg-icon>
            <svg-icon icon-class="file" v-else></svg-icon>
          </span>
          {{ record.name }}
        </span>
        <!--<span
          v-if="record.isFolder && (record.level === 1 || record.level === 2)"
          ><a-input v-model="record.name" class="edit-file-input"></a-input
        ></span>-->
      </template>
    </a-tree>

    <!--文件字段信息修改-->
    <div class="file-edit-container">
      <span class="file-edit-box">
        <a-select
          style="width: 120px"
          placeholder="数据精度"
          v-model="dataAccuracy"
        >
          <a-select-option value="chart">chart</a-select-option>
          <a-select-option value="short">short</a-select-option>
          <a-select-option value="int">int</a-select-option>
          <a-select-option value="float">float</a-select-option>
          <a-select-option value="double">double</a-select-option>
        </a-select>
      </span>
      <span class="file-edit-box">
        <a-input-number
          placeholder="中心频率"
          style="width: 120px"
          v-model="centerFrequency"
        ></a-input-number>
      </span>
      <!--<span class="file-edit-box">
        <a-date-picker style="width: 160px"></a-date-picker>
      </span>-->

      <span class="file-edit-btn">
        <a-button type="primary" @click="handleModifyFileConfig">修改</a-button>
      </span>
    </div>

    <!--文件校验列表-->
    <a-table
      bordered
      :columns="columns"
      :dataSource="fileDataList"
      :pagination="false"
      :rowSelection="{
        selectedRowKeys: selectedRowKeys,
        onChange: onSelectChange
      }"
      rowKey="fileId"
    >
      <template slot="operation" slot-scope="record">
        <a-button type="primary">修改</a-button>
      </template>
    </a-table>

    <!--文件列表弹框-->
    <!--<a-modal
      title="文件选择列表"
      :width="800"
      v-model="visible"
      @ok="startUpload"
      @cancel="cancelUpload"
    >
      &lt;!&ndash;<a-table
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
      </a-table>&ndash;&gt;
      <a-tree :treeData="fileList" checkable>
        <template slot="title" slot-scope="record">
          <span class="cus-tree-text">
            <span>
              <svg-icon
                icon-class="folder"
                v-if="record.isFolder === true"
              ></svg-icon>
              <svg-icon icon-class="file" v-else></svg-icon>
            </span>
            {{ record.name }}
          </span>
          <span
            v-if="record.isFolder && (record.level === 1 || record.level === 2)"
            ><a-input v-model="record.name" class="edit-file-input"></a-input
          ></span>
          &lt;!&ndash;<span><a-button @click="record.resume()">上传</a-button></span>&ndash;&gt;
        </template>
      </a-tree>
      &lt;!&ndash;<a-button type="primary" @click="startUpload">上传</a-button>&ndash;&gt;
    </a-modal>-->
  </div>
</template>

<script>
import SparkMD5 from 'spark-md5'
import _ from 'lodash'

import { ACCESS_TOKEN } from '@/store/mutation-types'
import {
  hasMd5,
  mergeFile,
  getFolderFileConfig,
  modifyFileConfig
} from '@/api/gtsb_folder_files'
// import { hasMd5, mergeFile } from '@/api/gtsb_files'

import { v4 as uuidv4 } from 'uuid'
import { axios } from '@/utils/request'

export default {
  name: 'UploaderTool',

  data() {
    return {
      // 文件上传配置项
      options: {
        // target: 'http://192.168.31.17:23412/folder/files/chunks',
        target: `${axios.defaults.baseURL}/folder/files/chunks`,
        headers: {
          Authorization: `bearer${this.$ls.get(ACCESS_TOKEN)}`
        },
        chunkSize: 10 * 1024 * 1024,
        simultaneousUploads: 20,
        autoStart: false,
        testChunks: false
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
      // 选择上传的文件夹中的文件个数
      fileLength: 0,
      columns: [
        {
          title: '文件名',
          dataIndex: 'name'
        },
        {
          title: '数据精度',
          dataIndex: 'dataAccuracy',
          align: 'center'
        },
        {
          title: '中心频率',
          dataIndex: 'centerFrequency',
          align: 'center'
        },
        /*{
          title: '数据精度',
          key: 'dataAccuracy',
          align: 'center',
          scopedSlots: { customRender: 'dataAccuracy' }
        },
        {
          title: '中心频率',
          key: 'centerFrequency',
          align: 'center',
          scopedSlots: { customRender: 'centerFrequency' }
        },
        {
          title: '日期',
          key: 'date',
          align: 'center',
          scopedSlots: { customRender: 'date' }
        },*/
        {
          title: '操作',
          key: 'actions',
          align: 'center',
          scopedSlots: { customRender: 'operation' }
        }
      ],
      selectedRowKeys: [],
      visible: false,
      fileTableList: [
        {
          children: [
            {
              children: [
                {
                  children: [
                    {
                      fileId: '{ca15b37c-43e7-4341-ac6f-25125742a7b3}',
                      isFolder: false,
                      level: 3,
                      name: 'ddddddd.txt',
                      relativePath:
                        './import_ADS-B_OrignalSignal_char_200/ip24/five'
                    }
                  ],
                  fileId: '{e230bb13-0df1-46e5-9790-505881664657}',
                  isFolder: true,
                  level: 3,
                  name: 'five',
                  relativePath: './import_ADS-B_OrignalSignal_char_200/ip24'
                },
                {
                  children: [
                    {
                      fileId: '{9fa77c77-864a-4441-b405-ed9f96796a08}',
                      isFolder: false,
                      level: 3,
                      name: '24hebi.txt',
                      relativePath:
                        './import_ADS-B_OrignalSignal_char_200/ip24/folder'
                    }
                  ],
                  fileId: '{5e76bf48-0ad4-4ecd-9653-40f658b2b4ee}',
                  isFolder: true,
                  level: 3,
                  name: 'folder',
                  relativePath: './import_ADS-B_OrignalSignal_char_200/ip24'
                }
              ],
              fileId: '{d0e4dbad-b2d9-4d6f-be8e-8ec2c3e43274}',
              isFolder: true,
              level: 2,
              name: 'ip24',
              relativePath: './import_ADS-B_OrignalSignal_char_200'
            },
            {
              children: [
                {
                  children: [
                    {
                      fileId: '{c63b554d-1f47-45c3-bcd0-cfeabce971df}',
                      isFolder: false,
                      level: 3,
                      name: 'yyyyyyyyyy.txt',
                      relativePath:
                        './import_ADS-B_OrignalSignal_char_200/ip25/five'
                    }
                  ],
                  fileId: '{a0cdcecb-b565-48d9-846d-bb14b8db53c6}',
                  isFolder: true,
                  level: 3,
                  name: 'five',
                  relativePath: './import_ADS-B_OrignalSignal_char_200/ip25'
                },
                {
                  children: [
                    {
                      fileId: '{d5b5af04-323d-4051-9ae3-20dd14b7f285}',
                      isFolder: false,
                      level: 3,
                      name: '25hebi.txt',
                      relativePath:
                        './import_ADS-B_OrignalSignal_char_200/ip25/folder'
                    }
                  ],
                  fileId: '{5aafa4e8-2446-4e9c-a8f3-9c12f147826d}',
                  isFolder: true,
                  level: 3,
                  name: 'folder',
                  relativePath: './import_ADS-B_OrignalSignal_char_200/ip25'
                }
              ],
              fileId: '{8374de8b-eb2d-4d74-99db-e4a40b44595c}',
              isFolder: true,
              level: 2,
              name: 'ip25',
              relativePath: './import_ADS-B_OrignalSignal_char_200'
            }
          ],
          fileId: '{5f23ef79-1deb-4517-94ad-9429f5767345}',
          isFolder: true,
          level: 1,
          name: 'import_ADS-B_OrignalSignal_char_200',
          relativePath: './import_ADS-B_OrignalSignal_char_200'
        }
      ],
      fileDataList: [],
      dataAccuracy: '',
      centerFrequency: 0,
      folderId: ''
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
        // this.statusSet(fileInfo.fileId, 'merging')
        mergeFile(fileInfo)
          .then(res => {
            // this.statusRemove(fileInfo.fileId)
            // resolve(res.data.data.id)
            resolve()
          })
          .catch(() => {
            reject('error')
          })
      })
      return P
    },

    // 递归生成文件树
    generateFileTree(file, index) {
      file.scopedSlots = {
        title: 'title'
      }
      if (typeof index === 'number') {
        file.level = index + 1
      }
      if (file.isFolder && file.fileList) {
        file.children = file.fileList
        file.children.forEach(childFile => {
          this.generateFileTree(childFile, file.level)
        })
      } else {
        // this.fileTableList.push(file)
        return
      }
    },

    // 扁平化树结构json
    flatFolderJson(fileList, resList) {
      let infoArr = []
      fileList.forEach(file => {
        if (file.level === 1) {
          infoArr = file.name.split('_')
          if (infoArr[3]) {
            this.dataAccuracy = infoArr[3]
          }
          if (infoArr[4]) {
            this.centerFrequency = parseInt(infoArr[4])
          }
        }
        if (file.isFolder === true && file.children) {
          this.flatFolderJson(file.children, resList)
        } else if (file.isFolder === false) {
          file.dataAccuracy = file.dataAccuracy
            ? file.dataAccuracy
            : this.dataAccuracy
          file.centerFrequency = file.centerFrequency
            ? file.centerFrequency
            : this.centerFrequency
          resList.push(file)
          return
        }
      })
      return resList
    },

    // 选中文件夹
    onFilesAdd(files, fileList) {
      this.uploader.pause()
      this.fileLength = files.length
      // this.fileTableList = []
      let folderId = uuidv4()
      this.folderId = folderId
      files.forEach(file => {
        let tag = uuidv4()
        file.fileId = tag
        file.nameVerify = file.name
        file.folderId = folderId
        file.uniqueIdentifier = folderId + ';' + tag
      })
      this.fileList = fileList
      this.fileList.forEach(file => {
        this.generateFileTree(file, 0)
      })
      /*this.visible = true*/
      this.uploader.upload()
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

      // this.statusSet(file.fileId, 'md5')
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
      console.log(fileInfo)
      // this.statusRemove(file.fileId)
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
      // console.log(arguments[1])
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
    },

    handleModifyFileConfig() {
      let params = {
        fileParams: [
          {
            dataAccuracy: this.dataAccuracy,
            centerFrequency: this.centerFrequency,
            fileName: `import_ADS-B_原始信号_${this.dataAccuracy}_${
              this.centerFrequency
            }`,
            fileId: this.folderId
          }
        ],
        folderId: this.folderId
      }
      modifyFileConfig(params).then(res => {
        console.log(res)
      })
    }
  },

  created() {
    // this.fileDataList = this.flatFolderJson(this.fileTableList, [])
  },

  watch: {
    promiseList(val) {
      if (val.length === this.fileLength) {
        Promise.all(val).then(() => {
          getFolderFileConfig(this.folderId).then(res => {
            console.log(res)
            if (res.data) {
              this.fileDataList = this.flatFolderJson(res.data, [])
            }
          })
        })
      }
    }
  }
}
</script>

<style lang="less" scoped>
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
.edit-file-input {
  height: 20px;
  width: 100px;
  padding: 0;
  text-align: center;
}
.file-edit-container {
  margin-bottom: 10px;
  .file-edit-box {
    margin-right: 10px;
  }
  .file-edit-btn {
    float: right;
  }
}
</style>
