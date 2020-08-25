
<template>
    <div class="task-manage-container">
        <dv-border-box-4
                :color="['#124ef5', '#87ecf5']"
                style="padding: 40px 20px 0 20px;width: 100%;"
        >
            <div class="operate-btn-container">
                <dv-decoration-3 style="width:200px;height:30px;float: left;" />
                <a-button
                        class="editable-add-btn"
                        @click="handleAdd"
                        type="primary"
                        style="margin-right: 10px;"
                >查询</a-button
                >
                <a-button class="editable-add-btn" type="primary" @click="handleDelete"
                >删除</a-button
                >
            </div>
            <a-table
                    bordered
                    :dataSource="taskList"
                    :columns="columns"
                    rowKey="id"
                    :pagination="pagination"
                    :rowSelection="{
          selectedRowKeys: selectedRowKeys,
          onChange: onSelectChange
        }"
            >
                <template slot="name" slot-scope="text">
                    <editable-cell :text="text" />
                </template>
                <template slot="progress" slot-scope="progress, record">
                    <a-progress :percent="progress" status="active"></a-progress>
                </template>
                <template slot="operation" slot-scope="name, record">
                    <a-popconfirm
                            v-if="taskList.length"
                            title="确认重启吗"
                            @confirm="() => onRestart(record.id)"
                    >
                        <a href="javascript:;">重启</a>
                    </a-popconfirm>
                    <span style="margin-left: 10px" @click="getTaskLogFile(record.id)">
            <a href="javascript:;">日志信息</a>
          </span>
                </template>
            </a-table>
        </dv-border-box-4>

        <dv-border-box-3 style="padding: 20px 30px 40px 30px;margin-top: 20px;">
            <div class="chart-container">
                <a-row :gutter="20">
                    <a-col
                            :span="4"
                            v-for="(chart, index) in chartOptionList"
                            :key="index"
                    >
                        <dv-border-box-8>
                            <div class="chart-box">
                                <div
                                        :id="`taskChart${index}`"
                                        style="width: 100%; height: 100%;min-height: 400px;"
                                ></div>
                            </div>
                        </dv-border-box-8>
                    </a-col>
                </a-row>
            </div>
        </dv-border-box-3>

        <a-modal title="新建任务" :width="800" v-model="visible" @ok="handleOk">
            <a-form :form="createForm">
                <a-form-item
                        :label-col="formItemLayout.labelCol"
                        :wrapper-col="formItemLayout.wrapperCol"
                        label="名称"
                >
                    <a-input placeholder="请输入任务名称" v-model="createForm.name" />
                </a-form-item>
                <a-form-item
                        :label-col="formItemLayout.labelCol"
                        :wrapper-col="formItemLayout.wrapperCol"
                        label="描述"
                >
                    <a-input
                            placeholder="请输入任务描述"
                            v-model="createForm.description"
                    />
                </a-form-item>
                <a-form-item
                        v-for="(k, index) in createForm.attributeList"
                        :key="index"
                        v-bind="index === 0 ? attributeLayout : formItemLayoutWithOutLabel"
                        :label="index === 0 ? '参数项' : ''"
                        :required="false"
                >
                    <a-input
                            v-model="k.name"
                            placeholder="请输入参数名称"
                            style="width: 200px; margin-right: 8px"
                    />
                    <a-select
                            placeholder="请选择类型"
                            style="width: 140px; margin-right: 8px;"
                            v-model="k.type"
                    >
                        <a-select-option value="0">int</a-select-option>
                        <a-select-option value="1">double</a-select-option>
                        <a-select-option value="2">string</a-select-option>
                        <a-select-option value="3">boolean</a-select-option>
                    </a-select>
                    <a-icon
                            v-if="createForm.attributeList.length > 0"
                            class="dynamic-delete-button"
                            type="minus-circle-o"
                            :disabled="createForm.attributeList.length === 0"
                            @click="() => remove(k)"
                    />
                </a-form-item>
                <a-form-item v-bind="formItemLayoutWithOutLabel">
                    <a-button type="dashed" style="width: 60%" @click="addAttribute">
                        <a-icon type="plus" /> 添加参数
                    </a-button>
                </a-form-item>
            </a-form>
        </a-modal>
    </div>
</template>

<script>
    import {
        getApplication,
        deleteApplication,
        addApplication
    } from '@/api/application'
    import uniqid from 'uniqid'
    import { getTaskLogs } from '@/api/log'
    // import qs from 'qs'
    // import _ from 'lodash'
    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 5 }
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 }
        }
    }
    const formTailLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 5 }
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 }
        }
    }
    const attributeLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 5 }
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 19 }
        }
    }

    const chartOptionList = []
    for (let i = 0; i < 6; i++) {
        let option = {
            title: {
                text: `任务统计图${i + 1}`,
                left: 'center',
                textStyle: {
                    color: '#fff'
                }
            },
            tooltip: {},
            legend: {
                // orient: 'vertical',
                // top: 'middle',
                bottom: 10,
                left: 'center',
                data: ['type1', 'type2', 'type3', 'type4'],
                textStyle: {
                    color: '#fff'
                }
            },
            dataset: {
                source: [
                    ['product', '2012', '2013', '2014', '2015', '2016', '2017'],
                    ['type1', 41.1, 30.4, 65.1, 53.3, 83.8, 98.7],
                    ['type2', 86.5, 92.1, 85.7, 83.1, 73.4, 55.1],
                    ['type3', 24.1, 67.2, 79.5, 86.4, 65.2, 82.5],
                    ['type4', 55.2, 67.1, 69.2, 72.4, 53.9, 39.1]
                ]
            },
            series: [
                {
                    type: 'pie',
                    encode: {
                        itemName: 'product',
                        value: '2014'
                    },
                    radius: '65%',
                    center: ['50%', '50%']
                }
            ]
        }
        chartOptionList.push(option)
    }

    const taskList = []
    for (let i = 1; i < 100; i++) {
        let task = {
            name: `任务${i}`,
            id: i,
            description: `这是任务${i}`,
            createTime: '2020-05-26 15:20:17',
            progress: i
        }
        taskList.push(task)
    }
    export default {
        name: 'SeaEnvironment',
        data() {
            return {
                selectedRowKeys: [],
                pagination: {
                    defaultPageSize: 5,
                    showTotal: () => `共 ${this.taskList.length} 条数据`,
                    showSizeChanger: true,
                    showQuickJumper: true,
                    pageSizeOptions: ['5', '10', '15', '20']
                },
                columns: [
                    {
                        title: '名称',
                        dataIndex: 'name',
                        align: 'center'
                    },
                    {
                        title: '描述',
                        dataIndex: 'description',
                        align: 'center'
                    },
                    {
                        title: '创建时间',
                        dataIndex: 'createTime',
                        align: 'center'
                    },
                    {
                        title: '进度',
                        dataIndex: 'progress',
                        align: 'center',
                        scopedSlots: { customRender: 'progress' }
                    },
                    {
                        title: '操作',
                        dataIndex: 'operation',
                        align: 'center',
                        width: '300px',
                        scopedSlots: { customRender: 'operation' }
                    }
                ],
                chartOptionList,
                formItemLayout,
                formTailLayout,
                attributeLayout,
                formItemLayoutWithOutLabel: {
                    wrapperCol: {
                        xs: { span: 24, offset: 0 },
                        sm: { span: 19, offset: 5 }
                    }
                },
                taskList,
                chartList: [],
                targetApp: {},
                form: this.$form.createForm(this),
                createForm: {
                    name: '',
                    description: '',
                    attributeList: []
                },
                visible: false
            }
        },
        methods: {
            // 表格数据勾选回调
            onSelectChange(selectedRowKeys) {
                console.log('selectedRowKeys changed: ', selectedRowKeys)
                this.selectedRowKeys = selectedRowKeys
            },

            onRestart() {},

            resetForm() {
                this.createForm = {
                    name: '',
                    description: '',
                    attributeList: []
                }
            },

            handleAdd() {
                this.resetForm()
                this.visible = true
            },

            handleOk() {
                console.log(this.createForm)

                const postData = {
                    name: this.createForm.name,
                    description: this.createForm.description,
                    createTime: '2019-09-04 09:42:21',
                    params: [{ name: 'intA', description: 'int', type: '0' }]
                }
                const userId = '8bb3870f-4b5a-4a99-8650-59b7e977803a'
                addApplication(userId, JSON.stringify(postData))
            },

            remove(k) {
                const arr = this.createForm.attributeList
                arr.splice(arr.findIndex(item => item.id === k.attrId), 1)
                console.log(k)
            },

            addAttribute() {
                this.createForm.attributeList.push({
                    name: '',
                    type: '',
                    attrId: uniqid.time()
                })
            },

            // 绘制饼状图
            drawPie(id, option) {
                let myChart = this.$echarts.init(document.getElementById(id))
                myChart.setOption(option)
                this.chartList.push(myChart)
            },

            // 选择后删除
            handleDelete() {
                this.$confirm({
                    title: '警告',
                    content: `真的要删除选中的数据吗?`,
                    okText: '删除',
                    okType: 'danger',
                    cancelText: '取消',
                    onOk() {
                        console.log('OK')
                    },
                    onCancel() {
                        console.log('Cancel')
                    }
                })
            },

            // 获取日志文件
            getTaskLogFile() {
                let taskIds = [100, 200]
                let params = {
                    taskIds: taskIds
                }
                getTaskLogs(params).then(res => {
                    let filename = ''
                    if (res.headers.filename) {
                        filename = res.headers.filename
                    }
                    let blob = new Blob([res.data])
                    let downloadElement = document.createElement('a')
                    let href = window.URL.createObjectURL(blob) //创建下载的链接
                    downloadElement.href = href
                    downloadElement.download = filename //下载后文件名
                    document.body.appendChild(downloadElement)
                    downloadElement.click() //点击下载
                    document.body.removeChild(downloadElement) //下载完成移除元素
                    window.URL.revokeObjectURL(href) //释放掉blob对象
                })
            }
        },
        mounted() {
            setTimeout(() => {
                this.chartOptionList.forEach((option, index) => {
                    this.drawPie(`taskChart${index}`, option)
                })
                this.$nextTick(() => {
                    window.onresize = e => {
                        if (e.eventType !== 'routerChange') {
                            this.chartList.forEach(chart => {
                                chart.resize()
                            })
                        }
                    }
                })
            })
        }
    }
</script>

<style lang="less" scoped>
    .task-manage-container {
        padding-bottom: 20px;
    }
    .chart-container {
        margin-top: 20px;
        .chart-box {
            padding: 10px;
            border-radius: 6px;
            background: rgba(0, 0, 0, 0.3);
        }
    }
</style>
