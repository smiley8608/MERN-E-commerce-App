import { message, Space } from "antd";
import axios from "axios";
import { FormEvent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAppSelector } from "../redux/hook";
import Web3 from "web3";
import ContractABI from "../contractsAssets/ContractABI.json";
import { ContractAddress } from "../contractsAssets/contractsAddress";
// import { any } from "prop-types";
// import { Transaction } from "ethereumjs-tx";

const Checkout = () => {
  document.title = "KeyStone | Checkout";
  const navigate = useNavigate();
  const { ethereum }: any = window;
  const web3 = new Web3(ethereum);
  const GoerliTestnet = 5;
  // console.log("product", products);
  const [CoinLoading, setCoinLoading] = useState(false);
  const [TokenLoading, setTokenLoading] = useState(false);

  //   console.log(ethereum);
  const [serverAddress, setServerAddress] = useState<any>();

  const [currentAddress, setCurrentAddress] = useState<any>();
  const [currentChainId, setCurrentChainId] = useState<any>();
  const user = useAppSelector((state: any) => state.User.user);
  const auth = useAppSelector((state: any) => state.User.Auth);
  const cart = useAppSelector(
    (state: any) => state.User.User?.cart as CartItem[]
  );
  const [formState, setState] = useState<any>();

  let total = 0;

  if (cart?.length > 0) {
    for (let i = 0; i < cart.length; i++) {
      total += cart[i].quantity * cart[i].product.price;
    }
  }

  localStorage.removeItem("entryurl");

  if (!auth) {
    return (
      <div className="container wow fadeIn">
        <Link to={"/signin"}>
          <h2>Sign in to Checkout</h2>
        </Link>
      </div>
    );
  }

  const checkoutHandler = async (e: FormEvent) => {
    e.preventDefault();

    if (CoinLoading) {
      await sendCoinTransaction();
      setCoinLoading(false);
    } else if (TokenLoading) {
      await sendTransaction();
      setTokenLoading(false);
    }
  };

  const connectWallet = async () => {
    try {
      if (!ethereum) {
        console.log("please connect to metamask");
      } else {
        const account = await ethereum.request({
          method: "eth_requestAccounts",
        });
        setCurrentAddress(account[0]);
        await chainId();
        //  const networks=ethereum.networkVersion
        //  console.log('network',networks);
        await switchNetwork();
      }
    } catch (error) {
      console.log(error);
    }
  };
  const chainId = async () => {
    const chainId = await web3.eth.getChainId();
    setCurrentChainId(chainId);
    console.log("chainId", chainId);
  };
  const switchNetwork = async () => {
    try {
      
      if (currentChainId !== GoerliTestnet) {
        await ethereum.request({
          method: "wallet_switchEthereumChain",
          params: [
            {
              chainId: web3.utils.toHex(GoerliTestnet),
            },
          ],
        });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const getserver = async () => {
    await axios
      .get("/getserverAddress")
      .then(async (responce) => {
        console.log(responce.data.serverAddress);
         setServerAddress(responce.data.serverAddress);
        
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const sendCoinTransaction = async () => {
    try {
      if (!ethereum) {
        alert("please connect to the network");
      } else {
        await getserver();
        const amount = web3.utils.toHex(
          web3.utils.toWei(String(total / 3650), "ether")
        );
        console.log(amount);
        

        console.log(amount, serverAddress, currentAddress);
        const transaction = await web3.eth.sendTransaction({
          from: currentAddress,
          to: serverAddress,
          value: amount,
        });
        console.log(transaction);
        axios
          .post("/checkouts", {
            payable: total / 3650,
            checkout: formState,
            cart: cart,
            hash: {
              from: transaction.from,
              to: transaction.to,
              amount: total / 3650,
              hash: transaction.transactionHash,
            },
          })
          .then((result: any) => {
            console.log(result.data);
            alert(result.data.message);
            navigate("/u/orders");
          })
          .catch((error: any) => {
            console.log(error);
          });
      }
    } catch (error) {
      console.log(error);
    }
  };
  const sendTransaction = async () => {
    try {
      await getserver();
      console.log(serverAddress);

      const currentAccount = await web3.eth.getAccounts();
      if (!currentAccount) {
        console.log("cannot get account address from metamask");
      }
      const Contract = new web3.eth.Contract(
        ContractABI as [],
        ContractAddress
      );
      console.log(Contract);
      const amount = web3.utils.toHex(web3.utils.toWei(String(total), "ether"));
      console.log(currentAccount);

      await Contract.methods
        .transfer(serverAddress, amount)
        .send({ from: currentAccount[0] })
        .then(async (responce: any) => {
          await console.log(responce);
          console.log({
            from: responce.events.Transfer.returnValues.from,
            to: responce.events.Transfer.returnValues.to,
            value: responce.events.Transfer.returnValues.value,
            TransactionHash: responce.transactionHash,
          });

          //   TransactionHash=responce.transactionHash
          console.log(cart);

          await axios
            .post("/checkouts", {
              checkout: formState,
              user: user,
              cart,
              payable: total,
              hash: {
                from: responce.events.Transfer.returnValues.from,
                to: responce.events.Transfer.returnValues.to,
                amount: web3.utils.fromWei(
                  responce.events.Transfer.returnValues.value,
                  "ether"
                ),
                hash: responce.transactionHash,
              },
            })
            .then(async (response) => {
              console.log(response);
              await alert(response.data.message);
              navigate("/u/orders");
            })
            .catch((err) => {
              message.error(err.response.data.message);
            });
        })
        .catch((error: any) => {
          console.log(error);
        });
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="container wow fadeIn">
      <h2 className="my-5 h2 text-center">Checkout form</h2>

      <div className="row">
        <div className="col-md-8 mb-4">
          <div className="card">
            <form className="card-body" onSubmit={checkoutHandler}>
              <div className="row">
                <div className="col-md-6 mb-2">
                  <div className="md-form ">
                    <input
                      type="text"
                      id="firstName"
                      className="form-control"
                      value={
                        user?.fname
                          ? user.fname
                          : formState?.fname
                          ? formState.fname
                          : ""
                      }
                      onChange={(e) =>
                        setState({ ...formState, fname: e.target.value })
                      }
                    />
                    <label htmlFor="firstName" className="">
                      First name
                    </label>
                  </div>
                </div>

                <div className="col-md-6 mb-2">
                  <div className="md-form">
                    <input
                      type="text"
                      id="lastName"
                      className="form-control"
                      value={
                        user?.lname
                          ? user.lname
                          : formState?.lname
                          ? formState.lname
                          : ""
                      }
                      onChange={(e) =>
                        setState({ ...formState, lname: e.target.value })
                      }
                    />
                    <label htmlFor="lastName" className="">
                      Last name
                    </label>
                  </div>
                </div>
              </div>

              <div className="md-form input-group pl-0 mb-5">
                <div className="input-group-prepend">
                  <span className="input-group-text" id="basic-addon1">
                    @
                  </span>
                </div>
                <input
                  type="text"
                  className="form-control py-0"
                  placeholder="Username"
                  aria-describedby="basic-addon1"
                  value={user?.username}
                  disabled
                />
              </div>

              <div className="md-form mb-5">
                <input
                  type="text"
                  id="email"
                  className="form-control"
                  placeholder="youremail@example.com"
                  value={user?.email}
                  required
                  disabled
                />
                <label htmlFor="email" className="">
                  Email
                </label>
              </div>

              <div className="md-form mb-5">
                {/* <input
                                    type="text"
                                    id="address"
                                    className="form-control"
                                    placeholder="1234 Main St"
                                /> */}
                <div className="row">
                  <div className="col-lg-4 col-md-12 mb-4">
                    <label htmlFor="buildno">Building/Door No.</label>
                    <input
                      type="text"
                      id="buildno"
                      className="form-control"
                      placeholder=""
                      value={
                        user && user.address?.length > 0
                          ? user?.address[0].buildingNo
                          : formState?.buildingNo
                          ? formState.buildingNo
                          : ""
                      }
                      onChange={(e) =>
                        setState({ ...formState, buildingNo: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-lg-4 col-md-12 mb-4">
                    <label htmlFor="street">Street/Area</label>
                    <input
                      type="text"
                      id="street"
                      className="form-control"
                      placeholder="1234 Main St"
                      value={
                        user && user.address?.length > 0
                          ? user?.address[0].street
                          : formState?.street
                          ? formState.street
                          : ""
                      }
                      onChange={(e) =>
                        setState({ ...formState, street: e.target.value })
                      }
                    />
                  </div>
                  <div className="col-lg-4 col-md-12 mb-4">
                    <label htmlFor="city">City</label>
                    <input
                      type="text"
                      id="city"
                      className="form-control"
                      placeholder="1234 Main St"
                      value={
                        user && user.address?.length > 0
                          ? user?.address[0].city
                          : formState?.city
                          ? formState.city
                          : ""
                      }
                      onChange={(e) =>
                        setState({ ...formState, city: e.target.value })
                      }
                    />
                  </div>
                </div>
                <label htmlFor="address" className="">
                  Address
                </label>
              </div>

              <div className="row">
                <div className="col-lg-4 col-md-12 mb-4">
                  <label htmlFor="country">Country</label>
                  <select
                    className="custom-select d-block w-100"
                    id="country"
                    required
                    onChange={(e) =>
                      setState({ ...formState, country: e.target.value })
                    }
                    value={
                      user && user.address?.length > 0
                        ? user?.address[0].country
                        : formState?.country
                        ? formState.country
                        : ""
                    }
                  >
                    <option value="">Choose...</option>
                    <option value={"usa"}>United States</option>
                    <option value={"india"}>India</option>
                    <option value={"canada"}>Canada</option>
                  </select>
                </div>

                <div className="col-lg-4 col-md-6 mb-4">
                  <label htmlFor="state">State</label>
                  <select
                    className="custom-select d-block w-100"
                    id="state"
                    required
                    onChange={(e) =>
                      setState({ ...formState, state: e.target.value })
                    }
                    value={
                      user && user.address?.length > 0
                        ? user?.address[0].state
                        : formState?.state
                        ? formState.state
                        : ""
                    }
                  >
                    <option value="">Choose...</option>
                    {formState?.country === "india" && (
                      <>
                        <option>TamilNadu</option>
                        <option>Kerala</option>
                        <option>Andhra Pradesh</option>
                        <option>Karnataka</option>
                        <option>Telengana</option>
                      </>
                    )}
                  </select>
                  <div className="invalid-feedback">
                    Please provide a valid state.
                  </div>
                </div>

                <div className="col-lg-4 col-md-6 mb-4">
                  <label htmlFor="zip">Zip</label>
                  <input
                    type="text"
                    className="form-control"
                    id="zip"
                    placeholder=""
                    required
                    onChange={(e) =>
                      setState({ ...formState, pincode: e.target.value })
                    }
                    value={
                      user && user.address?.length > 0
                        ? user?.address[0].pincode
                        : formState?.pincode
                        ? formState.pincode
                        : ""
                    }
                  />
                  <div className="invalid-feedback">Zip code required.</div>
                </div>
              </div>

              <hr />
              {/* {currentAddress} */}
              {!currentAddress && (
                <button
                  className="btn btn-primary btn-lg btn-block"
                  onClick={connectWallet}
                  type={"button"}
                >
                  Continue to Wallet
                </button>
              )}
              {/* <div className="d-block my-3">
                <div className="custom-control custom-radio">
                  <input
                    id="credit"
                    name="paymentMethod"
                    type="radio"
                    className="custom-control-input"
                    required
                    onClick={() => {
                      setState({ ...formState, paymentmethod: "creditcard" });
                    }}
                  />
                  <label className="custom-control-label" htmlFor="credit">
                    Credit card
                  </label>
                </div>
              </div> */}

              {/* <div className="d-block my-3">
                                <div className="custom-control custom-radio">
                                    <input
                                        id="credit"
                                        name="paymentMethod"
                                        type="radio"
                                        className="custom-control-input"
                                        required
                                        onClick={() => { setState({ ...formState, paymentmethod: "creditcard" }) }}
                                    />
                                    <label className="custom-control-label" htmlFor="credit">
                                        Credit card
                                    </label>
                                </div>
                                <div className="custom-control custom-radio">
                                    <input
                                        id="debit"
                                        name="paymentMethod"
                                        type="radio"
                                        className="custom-control-input"
                                        required
                                        onClick={() => { setState({ ...formState, paymentmethod: "debitcard" }) }}
                                    />
                                    <label className="custom-control-label" htmlFor="debit">
                                        Debit card
                                    </label>
                                </div>
                                <div className="custom-control custom-radio">
                                    <input
                                        id="paypal"
                                        name="paymentMethod"
                                        type="radio"
                                        className="custom-control-input"
                                        required
                                        onClick={() => { setState({ ...formState, paymentmethod: "paypal" }) }}
                                    />
                                    <label className="custom-control-label" htmlFor="paypal">
                                        Paypal
                                    </label>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="cc-name">Name on card</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="cc-name"
                                        placeholder=""
                                        required
                                        value={formState?.cardname ? formState?.cardname : ""}
                                        onChange={(e) => { setState({ ...formState, cardname:e.target.value.toUpperCase() }) }}
                                    />
                                    <small className="text-muted">
                                        Full name as displayed on card
                                    </small>
                                    <div className="invalid-feedback">
                                        Name on card is required
                                    </div>
                                </div>
                                <div className="col-md-6 mb-3">
                                    <label htmlFor="cc-number">Credit card number</label>
                                    <input
                                        type="number"
                                        className="form-control"
                                        id="cc-number"
                                        placeholder=""
                                        required
                                        value={formState?.cardnumber ? formState?.cardnumber : ""}
                                        onChange={(e) => { setState({ ...formState, cardnumber:e.target.value }) }}
                                    />
                                    <div className="invalid-feedback">
                                        Credit card number is required
                                    </div>
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-md-3 mb-3">
                                    <label htmlFor="cc-expiration">Expiration</label>
                                    <input
                                        type={"month"}
                                        className="form-control"
                                        id="cc-expiration"
                                        placeholder=""
                                        required
                                        min={"2012-01"}
                                        max={"2034-01"}
                                        value={formState?.cardexp ? formState?.cardexp : ""}
                                        onChange={(e) => { setState({ ...formState, cardexp:e.target.value }) }}
                                    />
                                    <div className="invalid-feedback">
                                        Expiration date required
                                    </div>
                                </div>
                                <div className="col-md-3 mb-3">
                                    <label htmlFor="cc-expiration">CVV</label>
                                    <input
                                        type="text"
                                        className="form-control"
                                        id="cc-cvv"
                                        placeholder=""
                                        required
                                        value={formState?.cardccv ? formState?.cardccv : ""}
                                        onChange={(e) => { setState({ ...formState, cardccv:e.target.value }) }}
                                    />
                                    <div className="invalid-feedback">Security code required</div>
                                </div>
                            </div> */}
              <hr className="mb-4" />
              <Space wrap>
                <button
                  className="btn btn-primary btn-lg btn-block"
                  onClick={() => setCoinLoading(true)}
                  type="submit"
                >
                  Continue with coins
                </button>
                <button
                  className="btn btn-primary btn-lg btn-block "
                  onClick={() => setTokenLoading(true)}
                  type="submit"
                >
                  Continue with Token
                </button>
              </Space>
            </form>
          </div>
        </div>

        <div className="col-md-4 mb-4">
          <h4 className="d-flex justify-content-between align-items-center mb-3">
            <span className="text-muted">Your cart</span>
            <span className="badge badge-secondary badge-pill">
              {cart?.length}
            </span>
          </h4>

          <ul className="list-group mb-3 z-depth-1">
            {cart?.map((item: CartItem) => {
              return (
                <li
                  key={item.product._id}
                  className="list-group-item d-flex justify-content-between lh-condensed"
                >
                  <div>
                    <h6 className="my-0">{item.product.title}</h6>
                    <small className="text-muted">{item.product.brand}</small>
                  </div>
                  <span className="text-muted">
                    {item.product.price} x {item.quantity} :{" "}
                    {(item.quantity * item.product.price).toFixed(2)}
                  </span>
                </li>
              );
            })}

            <li className="list-group-item d-flex justify-content-between">
              <span>Total (Eth)</span>
              <strong>{total.toFixed(2)}</strong>
            </li>
          </ul>

          <form className="card p-2">
            <div className="input-group">
              <input
                type="text"
                className="form-control"
                placeholder="Promo code"
                aria-label="Recipient's username"
                aria-describedby="basic-addon2"
              />
              <div className="input-group-append">
                <button
                  className="btn btn-secondary btn-md waves-effect m-0"
                  type="button"
                >
                  Redeem
                </button>
              </div>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Checkout;
