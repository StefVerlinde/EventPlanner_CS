import React, { useEffect } from "react";
import formStyle from "./Form.module.scss";
import { useFormik } from "formik";
import CustomSelect from "./CustomSelect";
import useApi from "../hooks/useApi";
import * as Yup from "yup";
import momentTimezone from "moment-timezone";

function Form({ cardData }) {
  const { state: postState, fetchData: postData } = useApi();
  const userTimezone = momentTimezone.tz.guess(true);
  const allTimezones = momentTimezone.tz.names();
  const timezonesSelectArray = allTimezones.map((timezone) => ({
    value: timezone,
    label: timezone,
  }));

  useEffect(() => {
    cardData(postState);
  }, [postState]);

  const formik = useFormik({
    initialValues: {
      name: "",
      date: "",
      time: "",
      timezone: userTimezone,
      newTimezone: "",
    },
    validationSchema: Yup.object({
      name: Yup.string().required("Required"),
      date: Yup.date().required("Required"),
      time: Yup.string().required("Required"),
      timezone: Yup.string().required("Required"),
      newTimezone: Yup.string().required("Required"),
    }),
    onSubmit: (values) => {
      const options = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(values),
      };
      postData("/timecalc", options);
    },
  });

  return (
    <form onSubmit={formik.handleSubmit} className={formStyle.formContainer}>
      <h2>Event planner</h2>
      <label htmlFor="naam">Naam</label>
      <input
        id="name"
        name="name"
        type="text"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.name}
      />
      {formik.touched.name && formik.errors.name ? (
        <div className={formStyle.error}>{formik.errors.name}</div>
      ) : null}
      <label htmlFor="date">Datum</label>
      <input
        id="date"
        name="date"
        type="date"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.date}
      />
      {formik.touched.date && formik.errors.date ? (
        <div className={formStyle.error}>{formik.errors.date}</div>
      ) : null}
      <label htmlFor="date">Tijd</label>
      <input
        id="time"
        name="time"
        type="time"
        onChange={formik.handleChange}
        onBlur={formik.handleBlur}
        value={formik.values.time}
      />
      {formik.touched.time && formik.errors.time ? (
        <div className={formStyle.error}>{formik.errors.time}</div>
      ) : null}

      <label htmlFor="timezone">Originele tijdzone</label>
      <CustomSelect
        options={timezonesSelectArray}
        value={formik.values.timezone}
        onChange={({ value }) => formik.setFieldValue("timezone", value)}
        onBlur={formik.handleBlur}
        className={formStyle.tzSelect}
      />
      {formik.touched.timezone && formik.errors.timezone ? (
        <div className={formStyle.error}>{formik.errors.timezone}</div>
      ) : null}
      <label htmlFor="newTimezone">Nieuwe tijdzone</label>
      <CustomSelect
        options={timezonesSelectArray}
        value={formik.values.newTimezone}
        onChange={({ value }) => formik.setFieldValue("newTimezone", value)}
        onBlur={formik.handleBlur}
        className={formStyle.tzSelect}
      />
      {formik.touched.newTimezone && formik.errors.newTimezone ? (
        <div className={formStyle.error}>{formik.errors.newTimezone}</div>
      ) : null}

      <button type="submit">Verzenden</button>
    </form>
  );
}

export default Form;
