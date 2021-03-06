import React, { useCallback } from "react";
import { useHistory } from "react-router-dom";
import { useMutation } from "@apollo/client";
import { Form, Input, Select, Divider, Row, Col, message } from "antd";

import { cnpjMask } from "../../utils/mask";

import { CREATE_COMPANY } from "../../graphql/mutations";

import { Body } from "./create-company.styles";

import { Button } from "../../base-components/button";
import { PageTitle } from "../../base-components/page-title";

const benefits = [
  {
    label: "VR",
    value: "vr",
  },
  {
    label: "VT",
    value: "vt",
  },
  {
    label: "GymPass",
    value: "gymPass",
  },
];

export const CreateCompanyPage = () => {
  const [form] = Form.useForm();
  const history = useHistory();

  const [createCompany, { loading: creating }] = useMutation(CREATE_COMPANY);

  const handleSubmit = async (values) => {
    try {
      values.cnpj = values.cnpj.replace(/\D/g,'');

      await createCompany({ variables: values });
      form.resetFields();
      message.success("Empresa criada com sucesso!");

      history.push('/companies');
    } catch (err) {
      message.error(err.message);
    }
  };

  const onChangeCnpj = useCallback((event) => {
    event.currentTarget.maxLength = 18;
    return cnpjMask(event.currentTarget.value);
  }, [cnpjMask]);

  return (
    <>
      <Row justify="flex-start" align="middle" gutter={[0, 24]}>
        <Col>
          <PageTitle>Nova empresa</PageTitle>
        </Col>
        <Col span={24}>
          <Body>
            <Row justify="flex-start">
              <Col xs={24} sm={18} md={18} lg={12} xl={12}>
                <Form onFinish={handleSubmit} form={form} layout="vertical">
                  <Form.Item
                    label="Nome"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Campo obrigatório",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Nome fantasia"
                    name="tradingName"
                    rules={[
                      {
                        required: true,
                        message: "Campo obrigatório",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="CNPJ"
                    name="cnpj"
                    getValueFromEvent={onChangeCnpj}
                    rules={[
                      {
                        required: true,
                        message: "Campo obrigatório",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Endereço"
                    name="address"
                    rules={[
                      {
                        required: true,
                        message: "Campo obrigatório",
                      },
                    ]}
                  >
                    <Input />
                  </Form.Item>
                  <Form.Item
                    label="Benefícios"
                    name="chosenBenefits"
                    rules={[
                      {
                        required: true,
                        message: "Campo obrigatório",
                      },
                    ]}
                  >
                    <Select
                      mode="multiple"
                      allowClear
                      style={{ width: "100%" }}
                      placeholder="Selecionar"
                      options={benefits}
                    />
                  </Form.Item>
                  <Divider />
                  <Form.Item>
                    <Button
                      type="primary"
                      htmlType="submit"
                      color="secondary"
                      loading={creating}
                    >
                      Criar empresa
                    </Button>
                  </Form.Item>
                </Form>
              </Col>
            </Row>
          </Body>
        </Col>
      </Row>
    </>
  );
};
