import { useEffect } from "react";
import { Formik } from "formik";
import { useAppDispatch, useAppSelector } from "../../Redux Toolkit/Store";
import {
  fetchSellerAccount,
  resetAccountUpdated,
  updateSellerAccount,
} from "../../Redux Toolkit/Features/Seller/SellerSlice";

/* ================= TYPES ================= */

interface PersonalDetails {
  fullName: string;
  email: string;
  phone: string;
  altPhone: string;
}

interface BusinessDetails {
  businessName: string;
  businessType: string;
  gstNumber: string;
  panNumber: string;
}

interface PickupAddress {
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  pincode: string;
}

interface BankDetails {
  accountHolderName: string;
  accountNumber: string;
  ifsc: string;
  bankName: string;
  branchName: string;
}

export interface AccountFormType {
  personal: PersonalDetails;
  business: BusinessDetails;
  pickup: PickupAddress;
  bank: BankDetails;
}

/* ================= DEFAULT VALUES ================= */

const initialValues: AccountFormType = {
  personal: {
    fullName: "",
    email: "",
    phone: "",
    altPhone: "",
  },
  business: {
    businessName: "",
    businessType: "Individual",
    gstNumber: "",
    panNumber: "",
  },
  pickup: {
    addressLine1: "",
    addressLine2: "",
    city: "",
    state: "",
    pincode: "",
  },
  bank: {
    accountHolderName: "",
    accountNumber: "",
    ifsc: "",
    bankName: "",
    branchName: "",
  },
};

/* ================= API → FORM ================= */

const mapApiToFormValues = (apiData: any): AccountFormType => ({
  personal: {
    fullName: apiData?.sellerName || "",
    email: apiData?.email || "",
    phone: apiData?.mobile || "",
    altPhone: "",
  },

  business: {
    businessName: apiData?.businessDetails?.businessName || "",
    businessType: apiData?.businessDetails?.businessType || "Individual",
    gstNumber: apiData?.GSTIN || "",
    panNumber: apiData?.panDetails?.panNumber || "",
  },


  pickup: {
    addressLine1: apiData?.pickupAddress?.address || "",
    addressLine2: "",
    city: apiData?.pickupAddress?.city || "",
    state: apiData?.pickupAddress?.state || "",
    pincode: apiData?.pickupAddress?.pinCode || "",
  },



  bank: {
    accountHolderName: apiData?.bankDetails?.accountHolderName || "",
    accountNumber: apiData?.bankDetails?.accountNumber || "",
    ifsc: apiData?.bankDetails?.ifscCode || "",
    bankName: apiData?.bankDetails?.bankName || "",
    branchName: apiData?.bankDetails?.branchName || "",
  },
});

/* ================= FORM → API ================= */





const mapFormToApiPayload = (values: AccountFormType) => ({
  sellerName: values.personal.fullName,
  email: values.personal.email,
  mobile: values.personal.phone,

  GSTIN: values.business.gstNumber,

  /* ✅ BUSINESS DETAILS (MISSING FIX) */
  businessDetails: {
    businessName: values.business.businessName,
    businessType: values.business.businessType,
    businessEmail: values.personal.email,
    businessMobile: values.personal.phone,
  },

  /* ✅ PAN DETAILS */
  panDetails: {
    panNumber: values.business.panNumber,
    panHolderName: values.personal.fullName,
  },

  /* ✅ PICKUP ADDRESS */
  pickupAddress: {
    name: values.personal.fullName,
    mobile: values.personal.phone,
    address:
      values.pickup.addressLine1 +
      " " +
      values.pickup.addressLine2,
    locality: values.pickup.city || "NA",
    city: values.pickup.city,
    state: values.pickup.state,
    pinCode: values.pickup.pincode,
  },

  /* ✅ BANK DETAILS */
  bankDetails: {
    accountHolderName: values.bank.accountHolderName,
    accountNumber: values.bank.accountNumber,
    ifscCode: values.bank.ifsc,
    bankName: values.bank.bankName,
    branchName: values.bank.branchName,
  },
});



/* ================= COMPONENT ================= */

const AccountForm = () => {
  const dispatch = useAppDispatch();
  const { account, loading, accountUpdated } = useAppSelector(
    (state) => state.sellerManagement
  );

  /* Fetch seller account */
  useEffect(() => {
    dispatch(fetchSellerAccount());
  }, [dispatch]);

  /* Success toast */
  useEffect(() => {
    if (accountUpdated) {
      alert("Account updated successfully ✅");
      dispatch(resetAccountUpdated());
    }
  }, [accountUpdated, dispatch]);

  return (
    <Formik
      initialValues={account ? mapApiToFormValues(account) : initialValues}
      enableReinitialize
      onSubmit={(values) => {
        const payload = mapFormToApiPayload(values);
        console.log("UPDATE PAYLOAD 👉", payload);
        dispatch(updateSellerAccount(payload));
      }}
    >
      {({ values, handleChange, handleSubmit }) => (
        <form onSubmit={handleSubmit} className="space-y-6 max-w-4xl">

          {/* HEADER */}
          <div>
            <h2 className="text-xl font-semibold text-[#4A1F2A]">
              Account Settings
            </h2>
            <p className="text-xs text-gray-500 mt-1">
              Manage your personal, business, pickup and bank details.
            </p>
          </div>

          {/* PERSONAL */}
          <Section title="Personal Details" subtitle="Used for communication">
            <Grid>
              <Input label="Full Name" name="personal.fullName" value={values.personal.fullName} onChange={handleChange} />
              <Input label="Email" name="personal.email" value={values.personal.email} onChange={handleChange} />
              <Input label="Phone" name="personal.phone" value={values.personal.phone} onChange={handleChange} />
              <Input label="Alternate Phone" name="personal.altPhone" value={values.personal.altPhone} onChange={handleChange} />
            </Grid>
          </Section>

          {/* BUSINESS */}
          <Section title="Business Details" subtitle="Shown on invoice & GST">
            <Grid>
              <Input label="Business / Store Name" name="business.businessName" value={values.business.businessName} onChange={handleChange} />

              <div className="space-y-1">
                <label className="text-xs font-medium text-gray-600">
                  Business Type
                </label>
                <select
                  name="business.businessType"
                  value={values.business.businessType}
                  onChange={handleChange}
                  className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm bg-white"
                >
                  <option>Individual</option>
                  <option>Proprietorship</option>
                  <option>Partnership</option>
                  <option>Private Limited</option>
                  <option>LLP</option>
                </select>
              </div>

              <Input label="GST Number" name="business.gstNumber" value={values.business.gstNumber} onChange={handleChange} />
              <Input label="PAN Number" name="business.panNumber" value={values.business.panNumber} onChange={handleChange} />
            </Grid>
          </Section>

          {/* PICKUP */}
          <Section title="Pickup Address" subtitle="Courier will pick parcels from here">
            <Input label="Address Line 1" name="pickup.addressLine1" value={values.pickup.addressLine1} onChange={handleChange} />
            <Input label="Address Line 2" name="pickup.addressLine2" value={values.pickup.addressLine2} onChange={handleChange} />

            <div className="grid sm:grid-cols-3 gap-4">
              <Input label="City" name="pickup.city" value={values.pickup.city} onChange={handleChange} />
              <Input label="State" name="pickup.state" value={values.pickup.state} onChange={handleChange} />
              <Input label="Pincode" name="pickup.pincode" value={values.pickup.pincode} onChange={handleChange} />
            </div>
          </Section>

          {/* BANK */}
          <Section title="Bank Details" subtitle="For receiving payouts">
            <Grid>
              <Input label="Account Holder Name" name="bank.accountHolderName" value={values.bank.accountHolderName} onChange={handleChange} />
              <Input label="Account Number" name="bank.accountNumber" value={values.bank.accountNumber} onChange={handleChange} />
              <Input label="IFSC Code" name="bank.ifsc" value={values.bank.ifsc} onChange={handleChange} />
              <Input label="Bank Name" name="bank.bankName" value={values.bank.bankName} onChange={handleChange} />
              <Input label="Branch Name" name="bank.branchName" value={values.bank.branchName} onChange={handleChange} />
            </Grid>
          </Section>

          {/* SAVE */}
          <div className="flex justify-end">
            <button
              type="submit"
              disabled={loading}
              className="px-5 py-2 rounded-full bg-[#B9935A] text-white text-sm font-semibold disabled:opacity-60"
            >
              {loading ? "Saving..." : "Save Changes"}
            </button>
          </div>

        </form>
      )}
    </Formik>
  );
};

/* ================= UI HELPERS ================= */

const Section = ({ title, subtitle, children }: any) => (
  <section className="rounded-2xl bg-white border border-[#F0E4CC] p-5 shadow-sm space-y-4">
    <div className="flex items-center justify-between">
      <h3 className="text-sm font-semibold text-[#4A1F2A]">{title}</h3>
      <span className="text-[11px] text-gray-400">{subtitle}</span>
    </div>
    {children}
  </section>
);

const Grid = ({ children }: any) => (
  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
    {children}
  </div>
);

const Input = ({ label, ...props }: any) => (
  <div className="space-y-1">
    <label className="text-xs font-medium text-gray-600">{label}</label>
    <input
      {...props}
      className="w-full border border-gray-200 rounded-xl px-3 py-2 text-sm focus:outline-none focus:ring-1 focus:ring-[#B9935A]"
    />
  </div>
);

export default AccountForm;
