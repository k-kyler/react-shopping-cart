import Commerce from "@chec/commerce.js";

export const commerce = new Commerce(
    process.env.REACT_APP_COMMERCEJS_PUBLIC_KEY
);
