import React from 'react';


const ContainerHeader = ({title, BtnsDiv}) => {
  //const path = match.path.substr(1);
  //const subPath = path.split('/');
  return (
    <div className="page-heading d-sm-flex justify-content-sm-between align-items-sm-center">
      <h2 className="title mb-3 mb-sm-0">{title}</h2>
      {console.log('btnDiv', BtnsDiv)}
      {BtnsDiv? <BtnsDiv/>: null}
      {/*<Breadcrumb className="mb-0" tag="nav">
        {subPath.map((sub, index) => {
            return <BreadcrumbItem active={subPath.length === index + 1}
                                   tag={subPath.length === index + 1 ? "span" : "a"} key={index}
                                   href={getUrlString(path, sub, index)}>{getDisplayString(sub)}</BreadcrumbItem>
          }
        )}
        </Breadcrumb>*/}
    </div>
  )
};

export default ContainerHeader;

