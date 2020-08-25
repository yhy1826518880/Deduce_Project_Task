<template>
  <div class="search-panel-container" style="padding-top: 20px;">
    <div class="search-main">
      <div class="condition-container">
        <!--<el-tabs v-model="activeName">
          <el-tab-pane label="搜索项目" name="first">
            <div class="operation-btn-container">
              <div class="search-btn-container" style="float: right">
                <el-button type="primary" size="mini" @click="searchPro"
                  >搜索项目</el-button
                >
              </div>
              <div style="float: left">
                <el-button type="success" size="mini" @click="addCondition"
                  >增加</el-button
                >
                <el-button type="danger" size="mini" @click="deleteCondition"
                  >删除</el-button
                >
              </div>
            </div>
            <el-table
              :data="conditionList"
              max-height="300"
              @selection-change="handleSelectionChange"
              @select="selectRow"
              :row-class-name="tableRowClassName"
              ref="multipleTable"
            >
              <el-table-column type="selection" width="55"> </el-table-column>
              <el-table-column align="center" width="150px" label="列名">
                <template slot-scope="scope">
                  <a-select v-model="scope.row.field" placeholder="请选择">
                    <a-select-option
                      v-for="item in proFieldOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </a-select-option>
                  </a-select>
                </template>
              </el-table-column>
              <el-table-column align="center" width="150px" label="运算符">
                <template slot-scope="scope">
                  <a-select v-model="scope.row.operator" placeholder="请选择">
                    <a-select-option
                      v-for="item in operatorOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </a-select-option>
                  </a-select>
                </template>
              </el-table-column>
              <el-table-column align="center" min-width="200px" label="值">
                <template slot-scope="scope">
                  <a-input v-model="scope.row.value"></a-input>
                </template>
              </el-table-column>
              <el-table-column align="center" width="150px" label="逻辑符">
                <template slot-scope="scope">
                  <a-select
                    v-model="scope.row.logic"
                    placeholder="请选择"
                    clearable
                  >
                    <a-select-option
                      v-for="item in logicOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </a-select-option>
                  </a-select>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
          <el-tab-pane label="搜索文件" name="second">
            <div class="operation-btn-container">
              <div class="search-btn-container" style="float: right">
                <el-button type="primary" size="mini" @click="searchFile"
                  >搜索文件</el-button
                >
              </div>
              <div style="float: left">
                <el-button type="success" size="mini" @click="addFileCondition"
                  >增加</el-button
                >
                <el-button
                  type="danger"
                  size="mini"
                  @click="deleteFileCondition"
                  >删除</el-button
                >
              </div>
            </div>
            <el-table
              :data="fileConditionList"
              max-height="300"
              @selection-change="handleFileSelectionChange"
              @select="selectFileRow"
              :row-class-name="tableRowClassName"
              ref="multipleTable"
            >
              <el-table-column type="selection" width="55"> </el-table-column>
              <el-table-column align="center" width="150px" label="列名">
                <template slot-scope="scope">
                  <a-select v-model="scope.row.field" placeholder="请选择">
                    <a-select-option
                      v-for="item in fileFiledOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </a-select-option>
                  </a-select>
                </template>
              </el-table-column>
              <el-table-column align="center" width="150px" label="运算符">
                <template slot-scope="scope">
                  <a-select v-model="scope.row.operator" placeholder="请选择">
                    <a-select-option
                      v-for="item in operatorOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </a-select-option>
                  </a-select>
                </template>
              </el-table-column>
              <el-table-column align="center" min-width="200px" label="值">
                <template slot-scope="scope">
                  <a-input
                    v-model="scope.row.value"
                    v-if="scope.row.field !== 'secretClass'"
                  ></a-input>
                  <a-select
                    v-model="scope.row.value"
                    v-else
                    placeholder="请选择"
                    clearable
                  >
                    <a-select-option
                      v-for="item in secretClassOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </a-select-option>
                  </a-select>
                </template>
              </el-table-column>
              <el-table-column align="center" width="150px" label="逻辑符">
                <template slot-scope="scope">
                  <a-select
                    v-model="scope.row.logic"
                    placeholder="请选择"
                    clearable
                  >
                    <a-select-option
                      v-for="item in logicOptions"
                      :key="item.value"
                      :label="item.label"
                      :value="item.value"
                    >
                    </a-select-option>
                  </a-select>
                </template>
              </el-table-column>
            </el-table>
          </el-tab-pane>
        </el-tabs>-->
        <div
          class="operation-btn-container"
          style="margin-bottom: 20px;height: 30px;"
        >
          <div class="search-btn-container" style="float: right">
            <a-button type="primary" @click="searchPro">搜索项目</a-button>
          </div>
          <div style="float: left">
            <a-button
              type="primary"
              @click="addCondition"
              style="margin-right: 10px;"
              >增加</a-button
            >
            <a-button type="primary" @click="deleteCondition">删除</a-button>
          </div>
        </div>
        <a-table
          :dataSource="conditionList"
          ref="multipleTable"
          :rowSelection="{
            selectedRowKeys: selectedRow,
            onChange: handleSelectionChange
          }"
          :columns="columns"
          rowKey="id"
          :pagination="false"
        >
          <template slot="field" slot-scope="record">
            <a-select
              v-model="record.field"
              placeholder="请选择"
              style="width: 200px"
            >
              <a-select-option
                v-for="item in proFieldOptions"
                :key="item.value"
                :value="item.value"
              >
                {{ item.label }}
              </a-select-option>
            </a-select>
          </template>
          <template slot="operator" slot-scope="record">
            <a-select
              v-model="record.operator"
              placeholder="请选择"
              style="width: 200px"
            >
              <a-select-option
                v-for="item in operatorOptions"
                :key="item.value"
                :value="item.value"
              >
                {{ item.label }}
              </a-select-option>
            </a-select>
          </template>
          <template slot="value" slot-scope="record">
            <a-input v-model="record.value"></a-input>
          </template>
          <template slot="logic" slot-scope="record">
            <a-select
              v-model="record.logic"
              placeholder="请选择"
              style="width: 200px"
            >
              <a-select-option
                v-for="item in logicOptions"
                :key="item.value"
                :value="item.value"
              >
                {{ item.label }}
              </a-select-option>
            </a-select>
          </template>
        </a-table>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'searchPanel',
  data() {
    return {
      userId: '',
      activeName: 'first',
      mainActive: true,
      selectedRow: [],
      selectedFileRow: [],
      proResultList: [],
      fileResultList: [],
      filterObj: {},
      fileFilterObj: {},
      conditionList: [
        {
          field: '',
          operator: '',
          value: '',
          logic: ''
        }
      ],
      fileConditionList: [
        {
          field: '',
          operator: '',
          value: '',
          logic: ''
        }
      ],
      proFieldOptions: [
        {
          label: '名称',
          value: 'name'
        },
        {
          label: '令号',
          value: 'orderNum'
        },
        {
          label: '创建者',
          value: 'creator.username'
        },
        {
          label: '负责人',
          value: 'pic.username'
        }
      ],
      fileFiledOptions: [
        {
          label: '名称',
          value: 'name'
        },
        {
          label: '后缀',
          value: 'postfix'
        },
        {
          label: '密级',
          value: 'secretClass'
        },
        {
          label: '产品型号',
          value: 'productNo'
        },
        {
          label: '文件图号',
          value: 'fileNo'
        }
      ],
      operatorOptions: [
        {
          label: '包含',
          value: 'contains'
        },
        {
          label: '等于',
          value: 'eq'
        },
        {
          label: '不等于',
          value: 'neq'
        },
        {
          label: '开始为',
          value: 'startswith'
        },
        {
          label: '结束为',
          value: 'endswith'
        }
      ],
      secretClassOptions: [
        {
          label: '非密',
          value: 0
        },
        {
          label: '秘密',
          value: 1
        },
        {
          label: '机密',
          value: 2
        },
        {
          label: '绝密',
          value: 3
        }
      ],
      logicOptions: [
        {
          label: '或者',
          value: 'or'
        },
        {
          label: '并且',
          value: 'and'
        }
      ],
      secretMap: {
        非密: 0,
        秘密: 1,
        机密: 2,
        绝密: 3
      },
      columns: [
        {
          title: '列名',
          key: 'field',
          align: 'center',
          scopedSlots: { customRender: 'field' }
        },
        {
          title: '运算符',
          key: 'operator',
          align: 'center',
          scopedSlots: { customRender: 'operator' }
        },
        {
          title: '值',
          key: 'value',
          align: 'center',
          scopedSlots: { customRender: 'value' }
        },
        {
          title: '逻辑符',
          key: 'logic',
          align: 'center',
          scopedSlots: { customRender: 'logic' }
        }
      ]
    }
  },
  created() {
    this.userId = 'aaa'
  },
  methods: {
    // 样式逻辑
    showMainSearch() {
      this.mainActive = true
    },
    hideMainSearch() {
      // this.mainActive = false
      this.$store.dispatch('setIfSearch')
    },
    // 业务逻辑
    tableRowClassName(row) {
      row.row.index = row.rowIndex
    },
    searchPro() {
      this.proResultList = []
      if (this.conditionList.length == 0) {
        this.$message({
          message: '请先填写筛选条件！',
          type: 'warning'
        })
        return false
      }
      this.serializeCondition()
      /*let data
      if (this.filterObj.logic == '') {
        data = this.filterObj.filters[0]
      } else {
        data = this.filterObj
      }
      let postData = JSON.stringify(data)
      this.proResultList = []
      searchProject(postData).then(res => {
        if (res.data.code === 0) {
          this.proResultList = res.data.data
        }
      })*/
    },
    searchFile() {
      this.serializeFileCondition()
      /*let data
      if (this.fileFilterObj.logic == '') {
        data = this.fileFilterObj.filters[0]
      } else {
        data = this.fileFilterObj
      }
      let postData = JSON.stringify(data)
      searchFiles(postData).then(res => {
        if (res.data.code === 0) {
          this.fileResultList = res.data.data
        }
      })*/
    },
    // 增加项目筛选条件
    addCondition() {
      this.conditionList.push({
        field: '',
        operator: '',
        value: '',
        logic: ''
      })
    },
    // 删除项目筛选条件
    deleteCondition() {
      this.conditionList = this.conditionList.filter(item => {
        return item.checked !== true
      })
    },
    // 增加文件筛选条件
    addFileCondition() {
      this.fileConditionList.push({
        field: '',
        operator: '',
        value: '',
        logic: ''
      })
    },

    //删除文件筛选条件
    deleteFileCondition() {
      this.fileConditionList = this.fileConditionList.filter(item => {
        return item.checked !== true
      })
    },
    selectRow(selection, row) {
      row.checked = !row.checked
    },
    selectFileRow(selection, row) {
      row.checked = !row.checked
    },
    handleSelectionChange(val) {
      this.selectedRow = val
    },
    handleFileSelectionChange(val) {
      this.selectedFileRow = val
    },
    serializeFileCondition() {
      this.fileConditionList.forEach((item, index) => {
        // 不是最后一个条件
        if (
          index !== this.fileConditionList.length - 1 &&
          this.fileConditionList.length > 1
        ) {
          // 所有条件都不能为空
          if (
            item.field == '' ||
            item.operator == '' ||
            item.value == '' ||
            item.logic == ''
          ) {
            this.$message({
              message: '筛选条件填写不完整',
              type: 'warning'
            })
            return false
          }
        }
        // 只有一个条件
        if (this.fileConditionList.length == 1) {
          // 所有条件都不能为空
          if (item.field == '' || item.operator == '' || item.value == '') {
            console.log(item)
            this.$message({
              message: '筛选条件填写不完整',
              type: 'warning'
            })
            return false
          }
        }
      })
      let filterObj = {
        logic: '',
        filters: []
      }
      for (let i = 0; i < this.fileConditionList.length; i++) {
        let filterItem = {
          field: this.fileConditionList[i].field,
          operator: this.fileConditionList[i].operator,
          value: this.fileConditionList[i].value
        }
        if (filterItem.field === 'secretClass') {
          filterItem.value = this.secretMap[this.fileConditionList[i].value]
        }
        if (filterObj.filters.length > 1) {
          let copyObj = JSON.parse(JSON.stringify(filterObj))
          filterObj.filters = [filterItem, copyObj]
        } else {
          filterObj.filters.push(filterItem)
        }
        if (filterObj.filters.length == 2) {
          filterObj.logic = this.fileConditionList[i - 1].logic
        } else {
          filterObj.logic = this.fileConditionList[i].logic
        }
      }
      this.fileFilterObj = filterObj
    },
    serializeCondition() {
      this.conditionList.forEach((item, index) => {
        // 不是最后一个条件
        if (
          index !== this.conditionList.length - 1 &&
          this.conditionList.length > 1
        ) {
          // 所有条件都不能为空
          if (
            item.field == '' ||
            item.operator == '' ||
            item.value == '' ||
            item.logic == ''
          ) {
            this.$message({
              message: '筛选条件填写不完整',
              type: 'warning'
            })
            return false
          }
        }
        // 只有一个条件
        if (this.conditionList.length == 1) {
          // 所有条件都不能为空
          if (item.field == '' || item.operator == '' || item.value == '') {
            console.log(item)
            this.$message({
              message: '筛选条件填写不完整',
              type: 'warning'
            })
            return false
          }
        }
      })
      let filterObj = {
        logic: '',
        filters: []
      }
      for (let i = 0; i < this.conditionList.length; i++) {
        let filterItem = {
          field: this.conditionList[i].field,
          operator: this.conditionList[i].operator,
          value: this.conditionList[i].value
        }
        if (filterObj.filters.length > 1) {
          let copyObj = JSON.parse(JSON.stringify(filterObj))
          filterObj.filters = [filterItem, copyObj]
        } else {
          filterObj.filters.push(filterItem)
        }
        if (filterObj.filters.length == 2) {
          filterObj.logic = this.conditionList[i - 1].logic
        } else {
          filterObj.logic = this.conditionList[i].logic
        }
      }
      this.filterObj = filterObj
      console.log(filterObj)
    }
  },
  computed: {
    computeSecretClass() {
      return function(item) {
        if (item === 0) {
          return '公开'
        } else if (item === 1) {
          return '内部'
        } else if (item === 2) {
          return '秘密'
        } else if (item === 3) {
          return '机密'
        } else if (item === 4) {
          return '绝密'
        }
      }
    }
  }
}
</script>

<style lang="scss" scoped>
.search-panel-container {
  height: 100%;
}
</style>
