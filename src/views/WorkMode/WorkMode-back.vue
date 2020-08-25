<template>
  <div class="work-mode-container">
    <a-tabs defaultActiveKey="1" @change="onTabChange">
      <!--配置设置-->
      <a-tab-pane key="1">
        <span slot="tab">
          <a-icon type="setting" />
          配置设置
        </span>
        <div class="work-mode-setting">
          <div class="setting-type">
            <dv-border-box-8 style="padding: 20px 20px 16px;">
              <a-radio-group
                name="radioGroup"
                :defaultValue="1"
                v-model="activeMode"
                @change="modeRadioChange"
              >
                <a-radio :value="1">
                  <div class="type-container">
                    <dv-decoration-11 style="width:200px;height:60px;">
                      <span class="mode-icon">
                        <svg-icon icon-class="mode1"></svg-icon>
                      </span>
                      <span class="mode-text">采集存储</span>
                    </dv-decoration-11>
                  </div>
                </a-radio>
                <a-radio :value="2">
                  <div class="type-container">
                    <dv-decoration-11 style="width:200px;height:60px;">
                      <span class="mode-icon">
                        <svg-icon icon-class="mode2"></svg-icon>
                      </span>
                      <span class="mode-text">数据标注</span>
                    </dv-decoration-11>
                  </div>
                </a-radio>
                <a-radio :value="3">
                  <div style="" class="type-container">
                    <dv-decoration-11 style="width:200px;height:60px;">
                      <span class="mode-icon">
                        <svg-icon icon-class="mode3"></svg-icon>
                      </span>
                      <span class="mode-text">模型训练</span>
                    </dv-decoration-11>
                  </div>
                </a-radio>
                <a-radio :value="4">
                  <div style="" class="type-container">
                    <dv-decoration-11 style="width:200px;height:60px;">
                      <span class="mode-icon">
                        <svg-icon icon-class="mode4"></svg-icon>
                      </span>
                      <span class="mode-text">推理识别</span>
                    </dv-decoration-11>
                  </div>
                </a-radio>
              </a-radio-group>
            </dv-border-box-8>
          </div>
          <div class="setting-info">
            <!--采集存储-->
            <div v-show="activeMode === 1" class="setting-info-container">
              <!--<div class="col-setting-box">
                <div class="setting-box">
                  <div class="setting-title">
                    <span>基本设置</span>
                    <a-tooltip placement="top">
                      &lt;!&ndash;<template slot="title">
                        <span>高级设置</span>
                      </template>&ndash;&gt;
                      <span
                        class="advance-setting-btn"
                        @click="showAdvanceSettingForm"
                      >
                        <a-icon type="setting" />
                      </span>
                    </a-tooltip>
                  </div>
                  &lt;!&ndash;资源列表及采集设备配置信息&ndash;&gt;
                  <div class="resource-container">
                    <a-row :gutter="40">
                      <a-col :span="12" style="height: 100%;">
                        <div class="resource-list">
                          <dv-border-box-4
                            :color="['#124ef5', '#87ecf5']"
                            style="padding: 40px;"
                          >
                            <a-table
                              bordered
                              :dataSource="gatherResourceList"
                              :rowSelection="{
                                selectedRowKeys: gatherSelectedRowKeys,
                                onChange: onGatherSelectChange
                              }"
                              :columns="gatherColumns"
                              rowKey="id"
                              :pagination="false"
                            >
                              <template slot="state" slot-scope="state">
                                <span
                                  :style="{
                                    color: state === 0 ? 'red' : 'green'
                                  }"
                                >
                                  {{ state === 0 ? '忙碌' : '空闲' }}
                                </span>
                              </template>
                            </a-table>
                          </dv-border-box-4>
                        </div>
                      </a-col>
                      <a-col :span="12" style="height: 100%;">
                        <div class="resource-form">
                          <dv-border-box-4
                            :color="['#124ef5', '#87ecf5']"
                            style="padding: 40px;"
                          >
                            <a-form :form="gatherSettingForm">
                              <a-form-item
                                label="采集模式"
                                :label-col="{ span: 5 }"
                                :wrapper-col="{ span: 12 }"
                              >
                                <a-radio-group default-value="1">
                                  <a-radio :value="1"
                                    ><span style="color: #ced4ea;"
                                      >盲采</span
                                    ></a-radio
                                  >
                                  <a-radio :value="2"
                                    ><span style="color: #ced4ea;"
                                      >触发采</span
                                    ></a-radio
                                  >
                                </a-radio-group>
                              </a-form-item>
                              <a-form-item
                                label="中心频率"
                                :label-col="{ span: 5 }"
                                :wrapper-col="{ span: 12 }"
                              >
                                <a-input></a-input>
                              </a-form-item>
                              <a-form-item
                                label="采样率"
                                :label-col="{ span: 5 }"
                                :wrapper-col="{ span: 12 }"
                              >
                                <a-input></a-input>
                              </a-form-item>
                              <a-form-item
                                label="每帧数据点个数"
                                :label-col="{ span: 5 }"
                                :wrapper-col="{ span: 12 }"
                              >
                                <a-input></a-input>
                              </a-form-item>
                              <a-form-item
                                label="单文件最大存储容量"
                                :label-col="{ span: 5 }"
                                :wrapper-col="{ span: 12 }"
                              >
                                <a-input-number></a-input-number>
                              </a-form-item>
                              <a-form-item
                                label="文件存储路径"
                                :label-col="{ span: 5 }"
                                :wrapper-col="{ span: 12 }"
                              >
                                <a-input></a-input>
                              </a-form-item>
                              <a-form-item
                                label="文件名前缀"
                                :label-col="{ span: 5 }"
                                :wrapper-col="{ span: 12 }"
                              >
                                <a-input></a-input>
                              </a-form-item>
                            </a-form>
                          </dv-border-box-4>
                        </div>
                      </a-col>
                    </a-row>
                  </div>

                  &lt;!&ndash;基本设置form&ndash;&gt;
                  <div class="setting-form">
                    <dv-border-box-4
                      :color="['#124ef5', '#87ecf5']"
                      style="padding: 40px;height: 300px;"
                    >
                      <a-form :form="baseSettingForm">
                        <a-form-item
                          label="工作模式"
                          :label-col="{ span: 5 }"
                          :wrapper-col="{ span: 12 }"
                        >
                          <a-radio-group
                            default-value="2"
                            v-model="modelChoose"
                          >
                            <a-radio :value="1"
                              ><span style="color: #ced4ea;"
                                >手动模式</span
                              ></a-radio
                            >
                            <a-radio :value="2"
                              ><span style="color: #ced4ea;"
                                >自动模式</span
                              ></a-radio
                            >
                          </a-radio-group>
                        </a-form-item>
                        <a-form-item
                          v-show="modelChoose === 2"
                          label="开始时间"
                          :label-col="{ span: 5 }"
                          :wrapper-col="{ span: 12 }"
                        >
                          <a-date-picker
                            :disabledDate="disabledStartDate"
                            showTime
                            format="YYYY-MM-DD HH:mm:ss"
                            v-model="startValue"
                            placeholder="开始时间"
                            @openChange="handleStartOpenChange"
                          />
                        </a-form-item>
                        <a-form-item
                          v-show="modelChoose === 2"
                          label="结束时间"
                          :label-col="{ span: 5 }"
                          :wrapper-col="{ span: 12 }"
                        >
                          <a-date-picker
                            :disabledDate="disabledStartDate"
                            showTime
                            format="YYYY-MM-DD HH:mm:ss"
                            v-model="endValue"
                            placeholder="结束时间"
                            @openChange="handleStartOpenChange"
                          />
                        </a-form-item>
                        <a-form-item
                          label="结束后操作"
                          v-show="modelChoose === 2"
                          :label-col="{ span: 5 }"
                          :wrapper-col="{ span: 12 }"
                        >
                          <a-radio-group default-value="1">
                            <a-radio :value="1"
                              ><span style="color: #ced4ea;"
                                >关机</span
                              ></a-radio
                            >
                            <a-radio :value="2"
                              ><span style="color: #ced4ea;"
                                >待机</span
                              ></a-radio
                            >
                          </a-radio-group>
                        </a-form-item>
                      </a-form>
                    </dv-border-box-4>
                  </div>
                </div>
                <div class="setting-button-container">
                  <a-button type="primary" style="margin: 12px 20px"
                    >启动</a-button
                  >
                </div>
              </div>-->
              <gather-mode></gather-mode>
            </div>

            <!--数据标注-->
            <div v-show="activeMode === 2" class="setting-info-container">
              <div class="col-setting-box">
                <div class="setting-box">
                  <div class="setting-title">
                    <span>基本设置</span>
                    <a-tooltip placement="top">
                      <template slot="title">
                        <span>高级设置</span>
                      </template>
                      <span
                        class="advance-setting-btn"
                        @click="showAdvanceSettingForm"
                      >
                        <a-icon type="setting" />
                      </span>
                    </a-tooltip>
                  </div>
                  <!--资源列表及采集设备配置信息-->
                  <div class="resource-container">
                    <div class="resource-form">
                      <dv-border-box-4
                        :color="['#124ef5', '#87ecf5']"
                        style="padding: 40px;"
                      >
                        <div class="mark-mode-box" style="margin-bottom: 20px;">
                          <a-radio-group default-value="1" v-model="markMode">
                            <a-radio :value="1"
                              ><span style="color: #ced4ea;"
                                >在线标注</span
                              ></a-radio
                            >
                            <a-radio :value="2"
                              ><span style="color: #ced4ea;"
                                >离线标注</span
                              ></a-radio
                            >
                          </a-radio-group>
                        </div>
                        <a-table
                          v-show="markMode === 1"
                          bordered
                          :dataSource="gatherResourceList"
                          :rowSelection="{
                            selectedRowKeys: gatherSelectedRowKeys,
                            onChange: onGatherSelectChange
                          }"
                          :columns="gatherColumns"
                          rowKey="id"
                          :pagination="false"
                        >
                          <template slot="state" slot-scope="state">
                            <span
                              :style="{
                                color: state === 0 ? 'red' : 'green'
                              }"
                            >
                              {{ state === 0 ? '忙碌' : '空闲' }}
                            </span>
                          </template>
                        </a-table>
                        <a-table
                          v-show="markMode === 2"
                          bordered
                          :dataSource="markFileList"
                          :rowSelection="{
                            selectedRowKeys: gatherSelectedRowKeys,
                            onChange: onGatherSelectChange
                          }"
                          :columns="gatherColumns"
                          rowKey="id"
                          :pagination="false"
                        >
                        </a-table>
                      </dv-border-box-4>
                    </div>
                  </div>

                  <!--基本设置form-->
                  <div class="setting-form">
                    <dv-border-box-4
                      :color="['#124ef5', '#87ecf5']"
                      style="padding: 40px;height: 300px;"
                    >
                      <a-form :form="baseSettingForm">
                        <a-form-item
                          label="工作模式"
                          :label-col="{ span: 5 }"
                          :wrapper-col="{ span: 12 }"
                        >
                          <a-radio-group
                            default-value="2"
                            v-model="modelChoose"
                          >
                            <a-radio :value="1"
                              ><span style="color: #ced4ea;"
                                >手动模式</span
                              ></a-radio
                            >
                            <a-radio :value="2"
                              ><span style="color: #ced4ea;"
                                >自动模式</span
                              ></a-radio
                            >
                          </a-radio-group>
                        </a-form-item>
                        <a-form-item
                          v-show="modelChoose === 2"
                          label="开始时间"
                          :label-col="{ span: 5 }"
                          :wrapper-col="{ span: 12 }"
                        >
                          <a-date-picker
                            :disabledDate="disabledStartDate"
                            showTime
                            format="YYYY-MM-DD HH:mm:ss"
                            v-model="startValue"
                            placeholder="开始时间"
                            @openChange="handleStartOpenChange"
                          />
                        </a-form-item>
                        <a-form-item
                          v-show="modelChoose === 2"
                          label="结束时间"
                          :label-col="{ span: 5 }"
                          :wrapper-col="{ span: 12 }"
                        >
                          <a-date-picker
                            :disabledDate="disabledStartDate"
                            showTime
                            format="YYYY-MM-DD HH:mm:ss"
                            v-model="endValue"
                            placeholder="结束时间"
                            @openChange="handleStartOpenChange"
                          />
                        </a-form-item>
                        <a-form-item
                          label="结束后操作"
                          v-show="modelChoose === 2"
                          :label-col="{ span: 5 }"
                          :wrapper-col="{ span: 12 }"
                        >
                          <a-radio-group default-value="1">
                            <a-radio :value="1"
                              ><span style="color: #ced4ea;"
                                >关机</span
                              ></a-radio
                            >
                            <a-radio :value="2"
                              ><span style="color: #ced4ea;"
                                >待机</span
                              ></a-radio
                            >
                          </a-radio-group>
                        </a-form-item>
                      </a-form>
                    </dv-border-box-4>
                  </div>
                </div>
                <div class="setting-button-container">
                  <a-button type="primary" style="margin: 12px 20px"
                    >启动</a-button
                  >
                </div>
              </div>
            </div>

            <!--模型训练-->
            <div v-show="activeMode === 3" class="setting-info-container">
              <div class="col-setting-box">
                <div class="setting-box">
                  <div class="setting-title">
                    <span>基本设置</span>
                    <a-tooltip placement="top">
                      <template slot="title">
                        <span>高级设置</span>
                      </template>
                      <span
                        class="advance-setting-btn"
                        @click="showAdvanceSettingForm"
                      >
                        <a-icon type="setting" />
                      </span>
                    </a-tooltip>
                  </div>
                  <!--资源列表及采集设备配置信息-->
                  <div class="resource-container">
                    <a-row :gutter="40">
                      <a-col :span="12" style="height: 100%;">
                        <div class="resource-list">
                          <dv-border-box-4
                            :color="['#124ef5', '#87ecf5']"
                            style="padding: 40px;"
                          >
                            <a-table
                              bordered
                              :dataSource="gatherResourceList"
                              :rowSelection="{
                                selectedRowKeys: gatherSelectedRowKeys,
                                onChange: onGatherSelectChange
                              }"
                              :columns="gatherColumns"
                              rowKey="id"
                              :pagination="false"
                            >
                              <template slot="state" slot-scope="state">
                                <span
                                  :style="{
                                    color: state === 0 ? 'red' : 'green'
                                  }"
                                >
                                  {{ state === 0 ? '忙碌' : '空闲' }}
                                </span>
                              </template>
                            </a-table>
                          </dv-border-box-4>
                        </div>
                      </a-col>
                      <a-col :span="12" style="height: 100%;">
                        <div class="resource-form">
                          <dv-border-box-4
                            :color="['#124ef5', '#87ecf5']"
                            style="padding: 40px;"
                          >
                            <a-form :form="gatherSettingForm">
                              <a-form-item
                                label="采集模式"
                                :label-col="{ span: 5 }"
                                :wrapper-col="{ span: 12 }"
                              >
                                <a-radio-group default-value="1">
                                  <a-radio :value="1"
                                    ><span style="color: #ced4ea;"
                                      >盲采</span
                                    ></a-radio
                                  >
                                  <a-radio :value="2"
                                    ><span style="color: #ced4ea;"
                                      >触发采</span
                                    ></a-radio
                                  >
                                </a-radio-group>
                              </a-form-item>
                              <a-form-item
                                label="中心频率"
                                :label-col="{ span: 5 }"
                                :wrapper-col="{ span: 12 }"
                              >
                                <a-input></a-input>
                              </a-form-item>
                              <a-form-item
                                label="采样率"
                                :label-col="{ span: 5 }"
                                :wrapper-col="{ span: 12 }"
                              >
                                <a-input></a-input>
                              </a-form-item>
                              <a-form-item
                                label="每帧数据点个数"
                                :label-col="{ span: 5 }"
                                :wrapper-col="{ span: 12 }"
                              >
                                <a-input></a-input>
                              </a-form-item>
                              <a-form-item
                                label="单文件最大存储容量"
                                :label-col="{ span: 5 }"
                                :wrapper-col="{ span: 12 }"
                              >
                                <a-input-number></a-input-number>
                              </a-form-item>
                              <a-form-item
                                label="文件存储路径"
                                :label-col="{ span: 5 }"
                                :wrapper-col="{ span: 12 }"
                              >
                                <a-input></a-input>
                              </a-form-item>
                              <a-form-item
                                label="文件名前缀"
                                :label-col="{ span: 5 }"
                                :wrapper-col="{ span: 12 }"
                              >
                                <a-input></a-input>
                              </a-form-item>
                            </a-form>
                          </dv-border-box-4>
                        </div>
                      </a-col>
                    </a-row>
                  </div>

                  <!--基本设置form-->
                  <div class="setting-form">
                    <dv-border-box-4
                      :color="['#124ef5', '#87ecf5']"
                      style="padding: 40px;height: 300px;"
                    >
                      <a-form :form="baseSettingForm">
                        <a-form-item
                          label="工作模式"
                          :label-col="{ span: 5 }"
                          :wrapper-col="{ span: 12 }"
                        >
                          <a-radio-group
                            default-value="2"
                            v-model="modelChoose"
                          >
                            <a-radio :value="1"
                              ><span style="color: #ced4ea;"
                                >手动模式</span
                              ></a-radio
                            >
                            <a-radio :value="2"
                              ><span style="color: #ced4ea;"
                                >自动模式</span
                              ></a-radio
                            >
                          </a-radio-group>
                        </a-form-item>
                        <a-form-item
                          v-show="modelChoose === 2"
                          label="开始时间"
                          :label-col="{ span: 5 }"
                          :wrapper-col="{ span: 12 }"
                        >
                          <a-date-picker
                            :disabledDate="disabledStartDate"
                            showTime
                            format="YYYY-MM-DD HH:mm:ss"
                            v-model="startValue"
                            placeholder="开始时间"
                            @openChange="handleStartOpenChange"
                          />
                        </a-form-item>
                        <a-form-item
                          v-show="modelChoose === 2"
                          label="结束时间"
                          :label-col="{ span: 5 }"
                          :wrapper-col="{ span: 12 }"
                        >
                          <a-date-picker
                            :disabledDate="disabledStartDate"
                            showTime
                            format="YYYY-MM-DD HH:mm:ss"
                            v-model="endValue"
                            placeholder="结束时间"
                            @openChange="handleStartOpenChange"
                          />
                        </a-form-item>
                        <a-form-item
                          label="结束后操作"
                          v-show="modelChoose === 2"
                          :label-col="{ span: 5 }"
                          :wrapper-col="{ span: 12 }"
                        >
                          <a-radio-group default-value="1">
                            <a-radio :value="1"
                              ><span style="color: #ced4ea;"
                                >关机</span
                              ></a-radio
                            >
                            <a-radio :value="2"
                              ><span style="color: #ced4ea;"
                                >待机</span
                              ></a-radio
                            >
                          </a-radio-group>
                        </a-form-item>
                      </a-form>
                    </dv-border-box-4>
                  </div>
                </div>
                <div class="setting-button-container">
                  <a-button type="primary" style="margin: 12px 20px"
                    >启动</a-button
                  >
                </div>
              </div>
            </div>

            <!--推理识别-->
            <div v-show="activeMode === 4" class="setting-info-container">
              <div class="col-setting-box">
                <div class="setting-box">
                  <div class="setting-title">
                    <span>基本设置</span>
                    <a-tooltip placement="top">
                      <template slot="title">
                        <span>高级设置</span>
                      </template>
                      <span
                        class="advance-setting-btn"
                        @click="showAdvanceSettingForm"
                      >
                        <a-icon type="setting" />
                      </span>
                    </a-tooltip>
                  </div>
                  <!--资源列表及采集设备配置信息-->
                  <div class="resource-container">
                    <a-row :gutter="40">
                      <a-col :span="12" style="height: 100%;">
                        <div class="resource-list">
                          <dv-border-box-4
                            :color="['#124ef5', '#87ecf5']"
                            style="padding: 40px;"
                          >
                            <a-table
                              bordered
                              :dataSource="gatherResourceList"
                              :rowSelection="{
                                selectedRowKeys: gatherSelectedRowKeys,
                                onChange: onGatherSelectChange
                              }"
                              :columns="gatherColumns"
                              rowKey="id"
                              :pagination="false"
                            >
                              <template slot="state" slot-scope="state">
                                <span
                                  :style="{
                                    color: state === 0 ? 'red' : 'green'
                                  }"
                                >
                                  {{ state === 0 ? '忙碌' : '空闲' }}
                                </span>
                              </template>
                            </a-table>
                          </dv-border-box-4>
                        </div>
                      </a-col>
                      <a-col :span="12" style="height: 100%;">
                        <div class="resource-form">
                          <dv-border-box-4
                            :color="['#124ef5', '#87ecf5']"
                            style="padding: 40px;"
                          >
                            <a-form :form="gatherSettingForm">
                              <a-form-item
                                label="采集模式"
                                :label-col="{ span: 5 }"
                                :wrapper-col="{ span: 12 }"
                              >
                                <a-radio-group default-value="1">
                                  <a-radio :value="1"
                                    ><span style="color: #ced4ea;"
                                      >盲采</span
                                    ></a-radio
                                  >
                                  <a-radio :value="2"
                                    ><span style="color: #ced4ea;"
                                      >触发采</span
                                    ></a-radio
                                  >
                                </a-radio-group>
                              </a-form-item>
                              <a-form-item
                                label="中心频率"
                                :label-col="{ span: 5 }"
                                :wrapper-col="{ span: 12 }"
                              >
                                <a-input></a-input>
                              </a-form-item>
                              <a-form-item
                                label="采样率"
                                :label-col="{ span: 5 }"
                                :wrapper-col="{ span: 12 }"
                              >
                                <a-input></a-input>
                              </a-form-item>
                              <a-form-item
                                label="每帧数据点个数"
                                :label-col="{ span: 5 }"
                                :wrapper-col="{ span: 12 }"
                              >
                                <a-input></a-input>
                              </a-form-item>
                              <a-form-item
                                label="单文件最大存储容量"
                                :label-col="{ span: 5 }"
                                :wrapper-col="{ span: 12 }"
                              >
                                <a-input-number></a-input-number>
                              </a-form-item>
                              <a-form-item
                                label="文件存储路径"
                                :label-col="{ span: 5 }"
                                :wrapper-col="{ span: 12 }"
                              >
                                <a-input></a-input>
                              </a-form-item>
                              <a-form-item
                                label="文件名前缀"
                                :label-col="{ span: 5 }"
                                :wrapper-col="{ span: 12 }"
                              >
                                <a-input></a-input>
                              </a-form-item>
                            </a-form>
                          </dv-border-box-4>
                        </div>
                      </a-col>
                    </a-row>
                  </div>

                  <!--基本设置form-->
                  <div class="setting-form">
                    <dv-border-box-4
                      :color="['#124ef5', '#87ecf5']"
                      style="padding: 40px;height: 300px;"
                    >
                      <a-form :form="baseSettingForm">
                        <a-form-item
                          label="工作模式"
                          :label-col="{ span: 5 }"
                          :wrapper-col="{ span: 12 }"
                        >
                          <a-radio-group
                            default-value="2"
                            v-model="modelChoose"
                          >
                            <a-radio :value="1"
                              ><span style="color: #ced4ea;"
                                >手动模式</span
                              ></a-radio
                            >
                            <a-radio :value="2"
                              ><span style="color: #ced4ea;"
                                >自动模式</span
                              ></a-radio
                            >
                          </a-radio-group>
                        </a-form-item>
                        <a-form-item
                          v-show="modelChoose === 2"
                          label="开始时间"
                          :label-col="{ span: 5 }"
                          :wrapper-col="{ span: 12 }"
                        >
                          <a-date-picker
                            :disabledDate="disabledStartDate"
                            showTime
                            format="YYYY-MM-DD HH:mm:ss"
                            v-model="startValue"
                            placeholder="开始时间"
                            @openChange="handleStartOpenChange"
                          />
                        </a-form-item>
                        <a-form-item
                          v-show="modelChoose === 2"
                          label="结束时间"
                          :label-col="{ span: 5 }"
                          :wrapper-col="{ span: 12 }"
                        >
                          <a-date-picker
                            :disabledDate="disabledStartDate"
                            showTime
                            format="YYYY-MM-DD HH:mm:ss"
                            v-model="endValue"
                            placeholder="结束时间"
                            @openChange="handleStartOpenChange"
                          />
                        </a-form-item>
                        <a-form-item
                          label="结束后操作"
                          v-show="modelChoose === 2"
                          :label-col="{ span: 5 }"
                          :wrapper-col="{ span: 12 }"
                        >
                          <a-radio-group default-value="1">
                            <a-radio :value="1"
                              ><span style="color: #ced4ea;"
                                >关机</span
                              ></a-radio
                            >
                            <a-radio :value="2"
                              ><span style="color: #ced4ea;"
                                >待机</span
                              ></a-radio
                            >
                          </a-radio-group>
                        </a-form-item>
                      </a-form>
                    </dv-border-box-4>
                  </div>
                </div>
                <div class="setting-button-container">
                  <a-button type="primary" style="margin: 12px 20px"
                    >启动</a-button
                  >
                </div>
              </div>
            </div>
          </div>
        </div>
      </a-tab-pane>

      <!--结果展示-->
      <a-tab-pane key="2">
        <span slot="tab">
          <a-icon type="file" />
          结果展示
        </span>
        <div class="work-mode-result">
          <div class="flow-btn-container">
            <a-button type="primary" style="margin-right: 10px;"
              >暂停/运行</a-button
            >
            <a-button type="primary">结束</a-button>
          </div>

          <div class="result-show" v-show="activeMode === 1">
            <dv-border-box-13 style="padding: 20px;">
              <div class="flow-chart">
                <div class="gather-device">
                  <img src="../../assets/node.png" alt="" />
                </div>
                <div class="link-line"></div>
                <div class="gather-terminal">
                  <img src="../../assets/server.png" alt="" />
                </div>
                <div
                  class="gather-data-info"
                  style="width: 300px;float: right;padding-top: 10px;"
                >
                  <div>设备ID: #2123</div>
                  <div>设备状态: 正常</div>
                  <div>采集速率: 500M/S</div>
                </div>
              </div>
            </dv-border-box-13>
            <dv-border-box-11
              title="实时数据统计"
              style="padding: 40px;margin-top: 20px;"
            >
              <div class="flow-detail">
                <a-row :gutter="40">
                  <a-col :span="8">
                    <div
                      class="chart-box"
                      id="line#1"
                      style="width: 100%;min-height: 500px;"
                    ></div>
                  </a-col>
                  <a-col :span="8">
                    <div
                      class="chart-box"
                      id="line#2"
                      style="width: 100%;min-height: 500px;"
                    ></div>
                  </a-col>
                  <a-col :span="8">
                    <div
                      class="chart-box"
                      id="line#3"
                      style="width: 100%;min-height: 500px;"
                    ></div>
                  </a-col>
                </a-row>
              </div>
            </dv-border-box-11>
          </div>
          <div class="result-show" v-show="activeMode === 2">
            <div class="flow-chart">
              <a-steps :current="currentStep">
                <a-step v-for="(item, index) in steps" :key="index">
                  <div
                    class="custom-step"
                    slot="icon"
                    :class="{ 'current-step': currentStep === index }"
                    @dblclick="setCurrentStep(index)"
                  >
                    <dv-decoration-7 style="width:120px;height:30px;">{{
                      item.title
                    }}</dv-decoration-7>
                  </div>
                </a-step>
              </a-steps>
            </div>
            <div class="flow-detail">
              <div class="flow-detail-title">
                {{ steps[currentStep] ? steps[currentStep].title : '' }}
              </div>
              <div class="flow-detail-content">
                <a-card title="流程结果" :bordered="false">
                  <template>
                    <a-skeleton active />
                  </template>
                </a-card>
                <a-card title="流程结果" :bordered="false">
                  <template>
                    <a-skeleton active />
                  </template>
                </a-card>
              </div>
            </div>
          </div>
        </div>
      </a-tab-pane>
    </a-tabs>
    <a-modal title="高级设置" v-model="advanceFormVisible">
      <a-form :form="advanceSettingForm">
        <a-form-item
          label="高级配置1"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input></a-input>
        </a-form-item>
        <a-form-item
          label="高级配置2"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input></a-input>
        </a-form-item>
        <a-form-item
          label="高级配置3"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input></a-input>
        </a-form-item>
        <a-form-item
          label="高级配置4"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input></a-input>
        </a-form-item>
        <a-form-item
          label="高级配置5"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input></a-input>
        </a-form-item>
        <a-form-item
          label="高级配置6"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input></a-input>
        </a-form-item>
        <a-form-item
          label="高级配置7"
          :label-col="{ span: 5 }"
          :wrapper-col="{ span: 12 }"
        >
          <a-input></a-input>
        </a-form-item>
      </a-form>
    </a-modal>
  </div>
</template>

<script>
import { mapGetters } from 'vuex'
import { triggerWindowResizeEvent } from '@/utils/util'

import GatherMode from './components/Setting/GatherMode'
import MarkMode from './components/Setting/MarkMode'
import TrainMode from './components/Setting/TrainMode'
import ReasoningMode from './components/Setting/ReasoningMode'

export default {
  name: 'WorkMode',
  components: {
    GatherMode,
    MarkMode,
    TrainMode,
    ReasoningMode
  },
  data() {
    return {
      currentStep: 3,
      activeMode: 1,
      modelChoose: 2,
      formLayout: 'horizontal',
      baseSettingForm: this.$form.createForm(this, { name: 'coordinated' }),
      gatherSettingForm: this.$form.createForm(this, { name: 'coordinated' }),
      advanceSettingForm: this.$form.createForm(this, { name: 'coordinated' }),
      startValue: null,
      endValue: null,
      endOpen: false,
      steps: [
        {
          title: '流程1',
          status: 1
        },
        {
          title: '流程2',
          status: 0
        },
        {
          title: '流程3',
          status: 0
        },
        {
          title: '流程4',
          status: 0
        }
      ],
      advanceFormVisible: false,
      // 采集
      gatherResourceList: [
        { name: '采集设备1', id: '1', state: 1, type: 'PCIe' },
        { name: '采集设备2', id: '2', state: 1, type: 'USB' },
        { name: '采集设备3', id: '3', state: 0, type: '网口' },
        { name: '采集设备4', id: '4', state: 0, type: 'PCIe' },
        { name: '采集设备5', id: '5', state: 1, type: 'USB' }
      ],
      gatherColumns: [
        {
          title: '名称',
          dataIndex: 'name',
          align: 'center'
        },
        {
          title: '类型',
          dataIndex: 'type',
          align: 'center'
        },
        {
          title: '状态',
          dataIndex: 'state',
          align: 'center',
          scopedSlots: { customRender: 'state' }
        },
        {
          title: '设备ID',
          dataIndex: 'id',
          align: 'center'
        }
      ],
      gatherSelectedRowKeys: [],
      gatherPagination: {
        defaultPageSize: 5,
        showTotal: () => `共 ${this.gatherResourceList.length} 条数据`,
        showSizeChanger: true,
        showQuickJumper: true,
        pageSizeOptions: ['5', '10', '15', '20']
      },

      // 标注
      markMode: 1
    }
  },
  methods: {
    disabledStartDate(startValue) {
      const endValue = this.endValue
      if (!startValue || !endValue) {
        return false
      }
      return startValue.valueOf() > endValue.valueOf()
    },
    disabledEndDate(endValue) {
      const startValue = this.startValue
      if (!endValue || !startValue) {
        return false
      }
      return startValue.valueOf() >= endValue.valueOf()
    },
    handleStartOpenChange(open) {
      if (!open) {
        this.endOpen = true
      }
    },
    handleEndOpenChange(open) {
      this.endOpen = open
    },
    setCurrentStep(index) {
      this.currentStep = index
    },
    showAdvanceSettingForm() {
      this.advanceFormVisible = true
    },
    onGatherSelectChange(selectedRowKeys) {
      this.gatherSelectedRowKeys = selectedRowKeys
    },
    initGatherChartOption(chartTitle) {
      let option = {
        backgroundColor: new this.$echarts.graphic.LinearGradient(
          0,
          0,
          0,
          1,
          [
            {
              offset: 0,
              color: 'rgba(69,72,200,0.4)'
            },
            {
              offset: 1,
              color: 'rgba(95,160,255,0.7)'
            }
          ],
          false
        ),
        title: {
          text: chartTitle,
          left: 'center',
          bottom: '5%',
          textStyle: {
            color: '#fff',
            fontSize: 16
          }
        },
        grid: {
          top: '20%',
          left: '10%',
          right: '10%',
          bottom: '15%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['14', '15', '16', '17', '18', '19', '20', '21', '22', '23'],
          axisLabel: {
            margin: 30,
            color: '#ffffff63'
          },
          axisLine: {
            // show: false
            lineStyle: {
              color: '#fff',
              width: 2
            }
          },
          axisTick: {
            show: true,
            length: 25,
            lineStyle: {
              color: '#ffffff1f'
            }
          },
          splitLine: {
            show: true,
            lineStyle: {
              color: '#ffffff1f'
            }
          }
        },
        yAxis: [
          {
            type: 'value',
            position: 'left',
            axisLabel: {
              margin: 20,
              color: '#ffffff63'
            },

            axisTick: {
              show: true,
              length: 15,
              lineStyle: {
                color: '#ffffff1f'
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                color: '#ffffff1f'
              }
            },
            axisLine: {
              lineStyle: {
                color: '#fff',
                width: 2
              }
            }
          }
        ],
        series: [
          {
            name: '注册总量',
            type: 'line',
            smooth: false, //是否平滑曲线显示
            showAllSymbol: true,
            symbol: 'circle',
            symbolSize: 6,
            lineStyle: {
              normal: {
                color: '#fff' // 线条颜色
              }
            },
            label: {
              show: true,
              position: 'top',
              textStyle: {
                color: '#fff'
              }
            },
            itemStyle: {
              color: 'red',
              borderColor: '#fff',
              borderWidth: 3
            },
            tooltip: {
              show: false
            },
            areaStyle: {
              normal: {
                color: new this.$echarts.graphic.LinearGradient(
                  0,
                  0,
                  0,
                  1,
                  [
                    {
                      offset: 0,
                      color: '#2929fb'
                    },
                    {
                      offset: 1,
                      color: '#3fbbff0d'
                    }
                  ],
                  false
                )
              }
            },
            data: [393, 438, 485, 631, 689, 824, 987, 1000, 1100, 1200]
          }
        ]
      }
      return option
    },
    initGatherChartLine() {
      let option_1 = this.initGatherChartOption('时间_采集速率折线图')
      let option_2 = this.initGatherChartOption('时间_信号幅度折线图')
      let option_3 = this.initGatherChartOption('时间_信号频率折线图')
      let chart_1 = this.$echarts.init(document.getElementById('line#1'))
      let chart_2 = this.$echarts.init(document.getElementById('line#2'))
      let chart_3 = this.$echarts.init(document.getElementById('line#3'))
      chart_1.setOption(option_1)
      chart_2.setOption(option_2)
      chart_3.setOption(option_3)
    },
    onTabChange(tab) {
      if (tab == 2) {
        if (this.activeMode === 1) {
          this.$nextTick(() => {
            this.initGatherChartLine()
          })
        }
      }
    },
    modeRadioChange() {
      triggerWindowResizeEvent()
    }
  },
  computed: {
    ...mapGetters(['workMode'])
  }
}
</script>

<style lang="less" scoped>
.work-mode-container {
  height: 100%;
  .work-mode-setting {
    height: 100%;
    padding: 10px 10px;
  }
  .setting-type {
    background: rgba(127, 127, 127, 0.1);
    // padding: 20px;
    border-radius: 4px;
    .ant-radio-group {
      label {
        font-size: 20px;
        .mode-text {
          color: #ced4ea;
        }
      }
    }
    .type-container {
      display: inline-block;
      // height: 60px;
      // line-height: 60px;
      // padding: 4px 26px;
      // margin: 10px 40px 10px 0;
      // background: #1c5ea3;
      // border-radius: 4px;
      // box-shadow: 0 2px 12px 0 rgba(39, 107, 270, 1);
    }
    .mode-icon {
      margin-right: 10px;
      color: #d8f0ff;
    }
  }
  .setting-info {
    height: calc(100% - 120px);
    margin-top: 20px;
    background: rgba(127, 127, 127, 0.1);
    padding: 20px 20px;
    border-radius: 4px;
    .setting-info-container {
      height: 100%;
    }
  }
  .ant-row {
    height: 100%;
  }
  .col-setting-box {
    height: calc(100% - 60px);
    .setting-box {
      width: 100%;
      height: 100%;
      padding: 10px;
      background: rgba(0, 0, 0, 0.2);
      overflow-y: auto;
      /*隐藏滚动条，当IE下溢出，仍然可以滚动*/
      -ms-overflow-style: none;
      /*火狐下隐藏滚动条*/
      overflow: -moz-scrollbars-none;
      scrollbar-width: none;

      /*Chrome下隐藏滚动条，溢出可以透明滚动*/
      &::-webkit-scrollbar {
        width: 0px;
        display: none;
      }
    }
    .setting-title {
      color: #198efc;
      font-weight: 700;
      font-size: 18px;
      height: 30px;
      line-height: 30px;
    }
    .setting-form {
      margin-top: 20px;
      .ant-radio-group {
        label {
          font-size: 16px;
          color: #ced4ea;
        }
      }
      .ant-form-item-label {
        label {
          color: #ced4ea !important;
        }
      }
    }
  }
  .setting-button-container {
    height: 40px;
    line-height: 40px;
    text-align: right;
  }

  .work-mode-result {
    height: 100%;
    .flow-btn-container {
      text-align: right;
      height: 40px;
      line-height: 40px;
      margin-bottom: 10px;
    }
    .flow-chart {
      //background: rgba(127, 127, 127, 0.1);
      background: rgba(69, 72, 200, 0.2);
      padding: 20px;
      border-radius: 4px;
    }
    .flow-detail {
      height: calc(100% - 120px);
      margin-top: 20px;
      // background: rgba(127, 127, 127, 0.1);
      // padding: 20px 20px 0;
      border-radius: 4px;
      .flow-detail-title {
        height: 40px;
        line-height: 40px;
        font-size: 20px;
      }
    }
  }
  .custom-step {
    padding: 4px 20px;
    border-radius: 4px;
    // background: #4c6290;
    color: #ced4ea;
    cursor: pointer;
    &.current-step {
      background: #315cce;
      color: #47ffee;
    }
    // 禁止选中文字
    -moz-user-select: none; /*火狐*/
    -webkit-user-select: none; /*webkit浏览器*/
    -ms-user-select: none; /*IE10*/
    user-select: none;
  }
  .ant-card {
    background: rgba(0, 0, 0, 0.2);
  }

  .advance-setting-btn {
    float: right;
    cursor: pointer;
  }
  .resource-container {
    margin-top: 20px;
    height: 50%;
    min-height: 350px;
    .resource-form,
    .resource-list {
      height: 100%;
    }
  }
  .gather-device,
  .gather-terminal {
    display: inline-block;
    width: 80px;
    height: 80px;
    img {
      width: 100%;
      height: 100%;
    }
    margin: 0 20px;
  }
  .link-line {
    display: inline-block;
    height: 2px;
    width: 200px;
    background: #00a0e9;
  }
}
</style>
