"use client";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

const CurrencyConverter = () => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm();

  const [isClient, setIsClient] = useState(false);
  const [usAm, setUsAm] = useState(0);
  const [audAm, setAudAm] = useState(0);
  const [cadAm, setCadAm] = useState(0);
  const [inrAm, setInrAm] = useState(0);
  const [eurAm, setEurAm] = useState(0);
  const [convertAm, setConvertAm] = useState(0);
  useEffect(() => {
    setIsClient(true);
  }, []);
  const onSubmit = (data) => {
    const type = data.type;
    const amount = parseFloat(data.amount);

    if (type === "usd") {
      setUsAm(amount);
    }
    if (type === "aud") {
      setAudAm(amount);
    }
    if (type === "cad") {
      setCadAm(amount);
    }
    if (type === "inr") {
      setInrAm(amount);
    }
    if (type === "eur") {
      setEurAm(amount);
    }
  };

  useEffect(() => {
    const converterAud = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/currency/aud-to-bdt/${audAm}`
        );
        setConvertAm(res.data);
      } catch (error) {
        console.error("Error fetching :", error);
      }
    };

    if (audAm) {
      converterAud();
    }
  }, [audAm]);

  useEffect(() => {
    const converterCad = async () => {
      try {
        const res = await axios.get(
          `http://localhost:3000/currency/cad-to-bdt/${cadAm}`
        );
        setConvertAm(res.data);
      } catch (error) {
        console.error("Error fetching :", error);
      }
    };

    if (cadAm) {
      converterCad();
    }
  }, [cadAm]);

  useEffect(() => {
    if (inrAm) {
      const converterInr = async () => {
        try {
          const res = await axios.get(
            `http://localhost:3000/currency/inr-to-bdt/${inrAm}`
          );
          setConvertAm(res.data);
        } catch (error) {
          console.error("Error fetching :", error);
        }
      };
      converterInr();
    }
  }, [inrAm]);

  useEffect(() => {
    if (eurAm) {
      const converterEur = async () => {
        try {
          const res = await axios.get(
            `http://localhost:3000/currency/eur-to-bdt/${eurAm}`
          );
          setConvertAm(res.data);
        } catch (error) {
          console.error("Error fetching :", error);
        }
      };
      converterEur();
    }
  }, [eurAm]);

  useEffect(() => {
    if (usAm) {
      const converterUs = async () => {
        try {
          const res = await axios.get(
            `http://localhost:3000/currency/usd-to-bdt/${usAm}`
          );
          setConvertAm(res.data);
        } catch (error) {
          console.error("Error fetching :", error);
        }
      };
      converterUs();
    }
  }, [usAm]);

  console.log(convertAm);
  return (
    <div>
      {/* Open the modal using document.getElementById('ID').showModal() method */}
      <button
       className="btn text-3xl font-bold bg-white hover:bg-[#38B6FF] text-[#F7B030] shadow-xl hover:text-white shadow-[#F7B030]"
        onClick={() => document.getElementById("my_modal_5").showModal()}
      >
        Convert Your Currency
      </button>
      {isClient ? (
        <dialog id="my_modal_5" className="modal modal-bottom sm:modal-middle">
          <div className="modal-box">
            <p className="text-center">
              <div className="flex items-center justify-center">
                <img
                  src="https://i.ibb.co/MhD3Pbf/trip-nest-logo-removebg-preview.png"
                  className="h-[80px] w-[100px]"
                  alt=""
                />
                <h1 className="text-2xl font-bold text-[#F7B030]">
                  <span className="text-[#38B6FF]">Trip</span> Nest{" "}
                </h1>
              </div>
              <h1 className="text-2xl font-bold text-[#F7B030]">
                --Currency Converter--{" "}
              </h1>
              <div className="text-green-500 font-semibold text-xl">Converted Amount:
              <span className=" text-[#38B6FF] font-bold">Tk-{convertAm}</span>
              </div>
            </p>
            <div className="modal-action">
              <form
                method="dialog"
                onSubmit={handleSubmit(onSubmit)}
                className="card-body"
              >
                <div className="">
                  <select
                    {...register("type")}
                    className="select select-bordered border-2 border-[#F7B030] mb-2"
                  >
                    <option disabled selected>
                      Choose Amount Type
                    </option>
                    <option value="usd">USD</option>
                    <option value="aud">AUD</option>
                    <option value="cad">CAD</option>
                    <option value="inr">INR</option>
                    <option value="eur">EUR</option>
                  </select>
                  <div className="mb-2">
                    <input
                      type="text"
                      {...register("amount", { required: true })}
                      placeholder="enter amount"
                      name="amount"
                      className="border-2 border-[#F7B030] rounded-lg p-2"
                    />
                    {errors.username && (
                      <span className="text-red-700">*Amount is required</span>
                    )}
                  </div>
                  <button
                    className="btn"
                    onClick={() =>
                      document.getElementById("my_modal_5").close()
                    }
                  >
                    Close
                  </button>
                  <button className="text-white hover:bg-[#F7B030] bg-[#F7B030] p-2 rounded-lg">
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </dialog>
      ) : (
        "prerenderd"
      )}
    </div>
  );
};

export default CurrencyConverter;
