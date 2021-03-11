import React, { useRef, useState } from "react";
import { CModal, CModalHeader, CModalBody, CModalFooter } from "@coreui/react";
import { Spin, Form, Input, Button } from "antd";
import { useSelector, useDispatch } from "react-redux";
import { notify } from "../CustomComponent";

const layout = {
  labelCol: {
    span: 6,
  },
  wrapperCol: {
    span: 18,
  },
};

const ModalAdmin = (props) => {
  const dispatch = useDispatch();
  const adminModal = useSelector((state) => state.adminModal);

  const formRef = useRef(null);

  const [Title, setTitle] = useState(null);
  const [Loading, setLoading] = useState(false);

  const LoadData = () => {
    setLoading(true);

    let title = "";
    if (adminModal.page === "committee") {
      title = "รายชื่อกรรมการ";
    } else if (adminModal.page === "head") {
      title = "รายชื่อหัวหน้า";
    } else {
      title = "รายชื่อพนักงาน";
    }
    if (adminModal.type === "add") {
      setTitle(`เพิ่ม${title}`);
    } else {
      setTitle(`แก้ไข${title}`);
      ///  set values เซ็ทค่าในฟอร์ม
      // จะเอามาจาก props หรือ Axios ก็ได้
      formRef.current.setFieldsValue({
        user: {
          name: props.data.name,
          position: props.data.position,
          email: props.data.email,
          bel: props.data.bel,
        },
      });
    }

    setLoading(false);
  };

  const close = () => {
    formRef.current.resetFields();
    dispatch({ type: "set", adminModal: { ...adminModal, show: false } });
  };

  const saveCommittee = () => {
    setLoading(true);
    close();
    notify.success("บันทึกรายชื่อกรรมการเรียบร้อย !");
    props.reload();
    setLoading(false);
  };

  const saveHead = () => {
    setLoading(true);
    close();
    notify.success("บันทึกรายชื่อหัวหน้าเรียบร้อย !");
    props.reload();
    setLoading(false);
  };

  const saveStaff = () => {
    setLoading(true);
    close();
    notify.success("บันทึกรายชื่อพนักงานเรียบร้อย !");
    props.reload();
    setLoading(false);
  };

  const editCommittee = () => {
    setLoading(true);
    close();
    notify.success("แก้ไขรายชื่อกรรมการเรียบร้อย !");
    props.reload();
    setLoading(false);
  };

  const editHead = () => {
    setLoading(true);
    close();
    notify.success("แก้ไขรายชื่อหัวหน้าเรียบร้อย !");
    props.reload();
    setLoading(false);
  };

  const editStaff = () => {
    setLoading(true);
    close();
    notify.success("แก้ไขรายชื่อพนักงานเรียบร้อย !");
    props.reload();
    setLoading(false);
  };

  const onFinish = (values) => {
    if (adminModal.type === "add") {
      if (adminModal.page === "committee") {
        saveCommittee();
      } else if (adminModal.page === "head") {
        saveHead();
      } else {
        saveStaff();
      }
    } else {
      if (adminModal.page === "committee") {
        editCommittee();
      } else if (adminModal.page === "head") {
        editHead();
      } else {
        editStaff();
      }
    }
  };

  return (
    <CModal
      show={adminModal.show}
      onOpened={LoadData}
      closeOnBackdrop={false}
      size="lg"
    >
      <Spin size="large" tip="กำลังโหลด..." spinning={Loading}>
        <CModalHeader>
          <label
            className="m-0"
            style={{ color: "black", fontWeight: "bold", fontSize: 20 }}
          >
            {Title}
          </label>
        </CModalHeader>
        <Form
          ref={formRef}
          {...layout}
          name="nest-messages"
          onFinish={onFinish}
        >
          <CModalBody>
            <Form.Item
              style={{ marginBottom: "10px" }}
              name={["user", "name"]}
              label="ชื่อ-นามสกุล"
              rules={[{ required: true, message: "กรุณากรอก ชื่อ-นามสกุล!" }]}
            >
              <Input autoComplete={"off"} />
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "10px" }}
              name={["user", "position"]}
              label="ตำแหน่ง"
              rules={[{ required: true, message: "กรุณากรอก ตำแหน่ง!" }]}
            >
              <Input autoComplete={"off"} />
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "10px" }}
              name={["user", "email"]}
              label="อีเมลล์"
              rules={[
                { required: true, message: "กรุณากรอก อีเมลล์!" },
                { type: "email", message: "อีเมลล์ ไม่ถูกต้อง!" },
              ]}
            >
              <Input autoComplete={"off"} />
            </Form.Item>
            <Form.Item
              style={{ marginBottom: "10px" }}
              name={["user", "bel"]}
              label="เบอร์โทร"
              rules={[{ required: true, message: "กรุณากรอก เบอร์โทร!" }]}
            >
              <Input autoComplete={"off"} minLength={10} maxLength={10} />
            </Form.Item>
          </CModalBody>
          <CModalFooter>
            <Button type="primary" htmlType="submit">
              ยืนยัน
            </Button>
            <Button onClick={close}>ยกเลิก</Button>
          </CModalFooter>
        </Form>
      </Spin>
    </CModal>
  );
};

export default ModalAdmin;
