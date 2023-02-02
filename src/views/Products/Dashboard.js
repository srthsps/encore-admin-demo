import React, { useState, useEffect, memo } from "react";
//react-bootstrap
import { Nav, Tab, Card } from "react-bootstrap";

import { useHistory, useParams, Link } from "react-router-dom";

//components
import ProductDetails from "./ProductDetails";
// import Images from "./Components/Images";
const Dashboard = memo(() => {
  const history = useHistory();
  let { active_tab } = useParams();
  const tabs = [
    {
      title: "Details",
      route: "details",
      eventKey: "first",
      content: <ProductDetails />,
    },
    // {
    //   title: "Images",
    //   route: "images",
    //   eventKey: "second",
    //   // content: <Images />,
    // },
    
  ];
  useEffect(() => {
    const defaultTab = tabs[0].route;
    if (tabs.find((tab) => tab.eventKey === "first")) {
      history.replace(`./${defaultTab}`);
    }
  }, []);
  const toggle = (tabRoute) => {
    if (active_tab !== tabRoute) {
      history.push(`${tabRoute}`);
    }
  };
  const [selected, setSelected] = useState("first");
  return (
    <React.Fragment>
      <div className="">
        <Link
          to="/product"
          className=" text-primary d-inline-flex align-items-center mb-4"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="16"
            fill="currentColor"
            className="bi bi-caret-left-fill"
            viewBox="0 0 16 16"
          >
            <path d="m3.86 8.753 5.482 4.796c.646.566 1.658.106 1.658-.753V3.204a1 1 0 0 0-1.659-.753l-5.48 4.796a1 1 0 0 0 0 1.506z" />
          </svg>
          Back Products
        </Link>
        <Tab.Container defaultActiveKey="first">
          <Card>
            <Card.Body>
              <div className="d-flex flex-wrap align-items-center justify-content-between">
                <Nav
                  as="ul"
                  className="d-flex mb-0 text-center profile-tab"
                  data-toggle="slider-tab"
                  id="profile-pills-tab"
                  role="tablist"
                >
                  {tabs.map((item, idx) => (
                    <Nav.Item key={idx} as="li">
                      <Nav.Link
                        style={{
                          borderBottom:
                            selected === item.eventKey
                              ? "3px solid #018EC5"
                              : "",
                          color: selected === item.eventKey ? "" : "black",
                        }}
                        onClick={(e) => {
                          e.preventDefault();
                          setSelected(item.eventKey);
                          toggle(item.route);
                        }}
                        role="button"
                        eventKey={item.eventKey}
                      >
                        {item.title}
                      </Nav.Link>
                    </Nav.Item>
                  ))}
                </Nav>
              </div>
            </Card.Body>
          </Card>
          <Card>
            <Card.Body>
              <Tab.Content className="profile-content">
                {tabs.map((tabs) => (
                  <Tab.Pane eventKey={tabs.eventKey} key={tabs.title}>
                    {tabs.content}
                  </Tab.Pane>
                ))}
              </Tab.Content>
            </Card.Body>
          </Card>
        </Tab.Container>
      </div>
    </React.Fragment>
  );
});

export default Dashboard;






































// import React, { useState, useEffect, memo } from "react";
// //react-bootstrap
// import { Nav, Tab, Card } from "react-bootstrap";

// import { useHistory, useParams } from "react-router-dom";
// import BrandList from "./Brand/BrandList";
// import Category from "./Category/Category";
// import ProductList from "./Index";
// import ProductDetails from "./ProductDetails";


// //components
// // import BusinessDetails from "./BusinessDetails";
// // import ImageList from "./imagesList/ImagesList";
// // import WorkingDays from "./working/WorkingDaysList";

// const ProductDashboard = memo(() => {
//   const history = useHistory();
//   let { active_tab } = useParams();
//   const tabs = [
//     {
//       title: "Product List",
//       route: "Product-list",
//       eventKey: "first",
//       content: <ProductList />,
//     },
//     {
//       // title: "Product Details",
//       // route: "/product/{id}/Product-details",
//       eventKey: "second",
//       content: <ProductDetails />,
//     },
//     {
//       title: "Brand List",
//       route: "Brand-list",
//       eventKey: "third",
//       content: <BrandList/>,
//     },
//     {
//       title: "Categories List",
//       route: "Categories-list",
//       eventKey: "fourth",
//       content: <Category/>,
//     },


//   ];
//   useEffect(() => {
//     const defaultTab = tabs[0].route;
//     if (tabs.find((tab) => tab.eventKey === "first")) {
//       history.replace(`./${defaultTab}`);
//     }
//   }, []);
//   const toggle = (tabRoute) => {
//     if (active_tab !== tabRoute) {
//       history.push(`${tabRoute}`);
//     }
//   };
//   const [selected, setSelected] = useState("first");
//   return (
//     <React.Fragment>
//       <div className="">
//         <h5 className="mb-4">Products List</h5>
//         <Tab.Container defaultActiveKey="first">
//           <Card>
//             <Card.Body>
//               <div className="d-flex flex-wrap align-items-center justify-content-between">
//                 <Nav
//                   as="ul"
//                   className="d-flex mb-0 text-center profile-tab"
//                   data-toggle="slider-tab"
//                   id="profile-pills-tab"
//                   role="tablist"
//                 >
//                   {tabs.map((item, idx) => (
//                     <Nav.Item key={idx} as="li">
//                       <Nav.Link
//                         style={{
//                           borderBottom:
//                             selected === item.eventKey
//                               ? "3px solid #284D77"
//                               : "",
//                           color: selected === item.eventKey ? "" : "black",
//                         }}
//                         onClick={(e) => {
//                           e.preventDefault();
//                           setSelected(item.eventKey);
//                           toggle(item.route);
//                         }}
//                         role="button"
//                         eventKey={item.eventKey}
//                       >
//                         {item.title}
//                       </Nav.Link>
//                     </Nav.Item>
//                   ))}
//                 </Nav>
//               </div>
//             </Card.Body>
//           </Card>
//           <Card>
//             <Card.Body>
//               <Tab.Content className="profile-content">
//                 {tabs.map((tabs) => (
//                   <Tab.Pane eventKey={tabs.eventKey} key={tabs.title}>
//                     {tabs.content}
//                   </Tab.Pane>
//                 ))}
//               </Tab.Content>
//             </Card.Body>
//           </Card>
//         </Tab.Container>
//       </div>
//     </React.Fragment>
//   );
// });

// export default ProductDashboard;
