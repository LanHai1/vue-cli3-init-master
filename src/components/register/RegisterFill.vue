<template>
    <div class="register_fill">
        <h1 class="register_title_1">Welcome to SFCP</h1>
        <h2 class="register_title_2">个人注册</h2>
        <!-- 注册表单 -->
        <el-form :model="ruleForm" status-icon :rules="rules" ref="ruleForm" label-width="80px">
            <el-form-item label="用户名" prop="username">
                <el-tooltip class="item" effect="light" content="用户名6-18位字符，只能包含英文字母、数字、下划线" placement="right-start">
                    <el-input v-model.trim="ruleForm.username" autocomplete="off" placeholder="用户名6-18位字符，只能包含英文字母、数字、下划线"></el-input>
                </el-tooltip>
            </el-form-item>
            <el-form-item label="昵称" prop="name">
                <el-input v-model.trim="ruleForm.name" autocomplete="off" placeholder="昵称"></el-input>
            </el-form-item>
            <el-form-item label="手机号" prop="phone">
                <el-input v-model.number="ruleForm.phone" autocomplete="off" placeholder="手机号"></el-input>
            </el-form-item>
            <el-form-item label="密码" prop="pass">
                <el-input type="password" v-model.trim="ruleForm.pass" autocomplete="off" placeholder="密码不少于6位"></el-input>
            </el-form-item>
            <el-form-item label="确认密码" prop="checkPass">
                <el-input type="password" v-model.trim="ruleForm.checkPass" autocomplete="off" placeholder="确认密码"></el-input>
            </el-form-item>
            <el-row class="chk_inner">
                <el-col :span="24">
                    <el-checkbox v-model="checked">我已阅读并接受以下条款：</el-checkbox>
                </el-col>
            </el-row>
            <el-row>
                <el-col :span="24" class="contract">
                    <el-link>《银狐商业产品注册协议》</el-link>
                    <el-link>《银狐推广服务合同》</el-link>
                </el-col>
            </el-row>
            <el-form-item class="register_foot">
                <el-button type="primary" class="login_btn" @click="submitForm('ruleForm')">注册</el-button>
                <el-button class="register_btn" style="margin-left:24px;" @click="goback">返回</el-button>
            </el-form-item>
        </el-form>
    </div>
</template>

<script lang="ts">
import { validatePass, validateName, validatePhoneNb } from "@/utils/validate";
import { Component, Vue } from "vue-property-decorator";
@Component
export default class RegisterFill extends Vue {
    private username = (rule: object, value: string | undefined, callback: any) => {
        if (!value) {
            callback(new Error("请输入用户名"));
        } else if (!validateName(value)) {
            callback(new Error("6-18位字符，只能包含英文字母、数字、下划线"));
        } else {
            callback();
        }
    };
    private phone = (rule: object, value: string | undefined, callback: any) => {
        if (!value) {
            callback(new Error("请输入联系方式"));
        } else if (!validatePhoneNb(value)) {
            callback(new Error("请输入正确联系方式"));
        } else {
            callback();
        }
    };
    private validatePass1 = (rule: object, value: string | undefined, callback: any) => {
        if (!value) {
            callback(new Error("请输入密码"));
        } else if (!validatePass(value)) {
            callback(new Error("密码至少6位"));
        } else {
            callback();
        }
    };
    private validatePass2 = (rule: object, value: string | undefined, callback: any) => {
        if (!value) {
            callback(new Error("请再次输入密码"));
        } else if (value !== this.ruleForm.pass) {
            callback(new Error("两次输入密码不一致!"));
        } else {
            callback();
        }
    };

    private checked = true;
    private ruleForm = {
        username: "",
        name: "",
        phone: "",
        pass: "",
        checkPass: ""
    };
    private rules = {
        username: [{ validator: this.username, trigger: "blur" }],
        name: [{ required: true, message: "请输入昵称", trigger: "blur" }],
        phone: [{ validator: this.phone, trigger: "blur" }],
        pass: [{ validator: this.validatePass1, trigger: "blur" }],
        checkPass: [{ validator: this.validatePass2, trigger: "blur" }]
    }

    /**
     * submitForm
     */
    public submitForm(formName: string) {
        const form: any = this.$refs[formName]
        form.validate((valid: boolean) => {
            if (valid) {
                alert("submit!");
            } else {
                console.log("error submit!!");
                return false;
            }
        });
    }

    /**
     * goback
     */
    public goback() {
        this.$router.go(-1);
    }
}
</script>

<style scoped lang="scss">
@import "@/assets/css/reset_el/reset_el.scss";
.register_fill {
    .register_title_1 {
        font-size: 26px;
        @include font_normal;
        color: rgba(197, 200, 205, 1);
    }
    .register_title_2 {
        font-size: 24px;
        @include font_normal;
        color: #fe9818;
        margin: 4px 0 12px;
    }
    .register_foot {
        ::v-deep.el-form-item__content {
            margin-left: 0 !important;
            margin-top: 17px;
        }
    }
}
</style>