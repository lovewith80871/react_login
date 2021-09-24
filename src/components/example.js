import React from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as yup from "yup";
import strAccountSchema from "@src/utils/validations/strAccountSchema";

class RegisterFrom extends React.Component {
  constructor(props) {
    super(props);
    this.formik = {};
    this.state = {
      // 是否需要檢核成年年齡
      isCheckAgeRange: true,
      // 初始表單資料
      formInitValues: {
        account: "",
        name: "",
        age: 0,
        pcode: "",
        pcodeConfirm: "",
      },
    };
  }

  async componentDidMount() {
    // 模擬呼叫 api 等待資料回應
    this.getUserInfoToFillForm();
  }

  getUserInfoToFillForm = () => {
    setTimeout(() => {
      // 再次初始化表單資料
      this.setState({
        ...this.state,
        formInitValues: {
          account: "CHRIS",
          name: "克里斯",
          age: 10,
          pcode: "123",
          pcodeConfirm: "456",
        },
      });
    }, 1000);
  };

  // 表單檢核邏輯
  formSchema = () =>
    yup.object().shape({
      // [必填、小寫英文、不能為 admin 字串]
      account: yup
        .string()
        .required()
        .concat(strAccountSchema({ title: "帳號" })),
      // [必填]
      name: yup.string().required(),
      // [必填、選擇性檢核需大於18歲邏輯] (相依狀態值)
      age: this.getAgeSchema(),
      // [必填]
      pcode: yup.string().required(),
      // [密碼欄位輸入後才檢核。必填、需與密碼欄位輸入的資訊相同] (相依輸入值)
      pcodeConfirm: yup.string().when("pcode", (pcode, schema) => {
        return pcode ? schema.oneOf([pcode], "密碼需相同").required() : schema;
      }),
    });

  getAgeSchema = () => {
    const { isCheckAgeRange } = this.state;
    const required = yup.number().required();
    const min = yup.number().min(18);
    return required.concat(isCheckAgeRange ? min : null);
  };

  handleSwitchAgeRangeChecker = () => {
    this.setState({
      ...this.state,
      isCheckAgeRange: !this.state.isCheckAgeRange,
    });
  };

  handleChangeAgeTo18 = (setFieldValue) => (e) => {
    setFieldValue("age", 18);
  };

  handleRegister = async (values) => {
    const formData = JSON.stringify(values, null, 2);
    console.log(
      "%c formData ",
      "background-color: #3A88AE; color: white;font-size: 14px; font-weight: bold;",
      formData
    );
  };

  render() {
    return (
      <>
        <h3>會員註冊</h3>

        <Formik
          // 初始值
          initialValues={this.state.formInitValues}
          // 檢核邏輯
          validationSchema={this.formSchema()}
          // 送出表單
          onSubmit={this.handleRegister}
          // 允許重複賦予初始值
          enableReinitialize
        >
          {(formik) => {
            // Formik render methods and props
            // https://jaredpalmer.com/formik/docs/api/formik#formik-render-methods-and-props
            this.formik = formik; // 如果需要在此組件外操作 formik 時可以使用
            const { isSubmitting, values, setFieldValue } = formik;
            return (
              <Form className="tp-form">
                <div className="tp-form__row">
                  <div className="tp-code">
                    {values ? JSON.stringify(values, null, 2) : ""}
                  </div>
                </div>

                <div className="tp-form__row">
                  <div className="tp-form__label"> 帳號 </div>
                  <div className="tp-form__field">
                    <Field type="text" name="account" />
                    <ErrorMessage
                      name="account"
                      component="div"
                      className="tp-form__error"
                    />
                  </div>
                </div>

                <div className="tp-form__row">
                  <div className="tp-form__label"> 姓名 </div>
                  <div className="tp-form__field">
                    <Field type="text" name="name" />
                    <ErrorMessage
                      name="name"
                      component="div"
                      className="tp-form__error"
                    />
                  </div>
                </div>

                <div className="tp-form__row">
                  <div className="tp-form__label"> 年齡 </div>
                  <div className="tp-form__field">
                    <Field type="number" name="age" />
                    <ErrorMessage
                      name="age"
                      component="div"
                      className="tp-form__error"
                    />
                  </div>
                </div>

                <div className="tp-form__row">
                  <div className="tp-form__label"> 密碼 </div>
                  <div className="tp-form__field">
                    <Field type="password" name="pcode" />
                    <ErrorMessage
                      name="pcode"
                      component="div"
                      className="tp-form__error"
                    />
                  </div>
                </div>

                <div className="tp-form__row">
                  <div className="tp-form__label"> 確認密碼 </div>
                  <div className="tp-form__field">
                    <Field type="password" name="pcodeConfirm" />
                    <ErrorMessage
                      name="pcodeConfirm"
                      component="div"
                      className="tp-form__error"
                    />
                  </div>
                </div>

                <div className="tp-form__row tp-form__row--right">
                  <button
                    type="button"
                    onClick={this.handleChangeAgeTo18(setFieldValue)}
                  >
                    {" "}
                    設定年齡值為18{" "}
                  </button>
                  <button
                    type="button"
                    onClick={this.handleSwitchAgeRangeChecker}
                  >
                    {" "}
                    是否檢查年齡區間: {this.state.isCheckAgeRange
                      ? "Y"
                      : "N"}{" "}
                  </button>
                </div>

                <div className="tp-form__row tp-form__row--right">
                  <button type="submit" disabled={isSubmitting}>
                    {" "}
                    登入{" "}
                  </button>
                </div>
              </Form>
            );
          }}
        </Formik>
      </>
    );
  }
}

export default RegisterFrom;
