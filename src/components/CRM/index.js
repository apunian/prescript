import React from "react";
import { connect } from 'react-redux';
import { compose } from 'recompose';
import TaskList from "./TaskList";
import SiteVisit from "./SiteVisit";
import RecentActivity from "./RecentActivity";
import TicketList from "./TicketList";
import TaskByStatus from "./TaskByStatus";
import WelComeCard from "./WelComeCard";
import Overview from "./Overview";
import SiteAudience from "./SiteAudience";
import TotalRevenueCard from "./TotalRevenueCard";
import NewCustomers from "./NewCustomers";
import GrowthCard from "./GrowthCard";
import IconWithTextCard from "./IconWithTextCard";
import Widget from "./Widget";
import {detailCards, recentActivity} from "./data";
//import CurrencyCalculator from "../Crypto/CurrencyCalculator";
import ContainerHeader from "../AppLayout/ContainerHeader";
import IntlMessages from "../../utils/IntlMessages";

const CRM = (props) => {
  
  const match = props.match;
  console.log('CRM::props::', props);
  return (
    <div className="dashboard animated slideInUpTiny animation-duration-3">

      <ContainerHeader match={match} title={<IntlMessages id="sidebar.dashboard"/>}/>
      <div className="row">
        <div className="col-xl-12 col-lg-12 col-md-12 col-12">
          <Widget {...props}>
            <div className="row">
              <div className="col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
                <WelComeCard {...props}/>
              </div>

              <div className="jr-audi-col col-xl-3 col-lg-3 col-md-6 col-sm-6 col-12">
                <SiteAudience/>
              </div>
              
              <div className="jr-visit-col col-xl-6 col-lg-6 col-md-12 col-sm-12 col-12">
                <SiteVisit/>
              </div>
            </div>
          </Widget>
        </div>
        <div className="col-xl-4 col-lg-4 col-md-6 col-12">
          <TotalRevenueCard/>
        </div>
        <div className="col-xl-4 col-lg-4 col-md-6 col-12">
          <NewCustomers/>
        </div>
        <div className="col-xl-4 col-lg-4 col-md-12 col-12">
          <GrowthCard/>
        </div>
        <div className="col-xl-4 col-lg-4 col-md-12 col-12 order-lg-2">
          <Widget>
            <RecentActivity recentList={recentActivity} shape="rounded"/>
          </Widget>
          {/*<CurrencyCalculator/>*/}
        </div>

        <div className="col-xl-8 col-lg-8 col-md-12 col-12 order-lg-1">
          <div className="row">
            {detailCards.map((data, index) => <div key={index} className="col-xl-3 col-lg-3 col-md-3 col-sm-6 col-6">
              <IconWithTextCard data={data}/>
            </div>)
            }

            <div className="col-xl-12 col-lg-12 col-md-12 col-12">
              <TaskList/>
            </div>
            <div className="col-xl-7 col-lg-7 col-md-7 col-12">
              <TicketList/>
            </div>
            <div className="col-xl-5 col-lg-5 col-md-5 col-12">
              <TaskByStatus/>
            </div>
            <div className="col-xl-12 col-lg-12 col-md-12 col-12">
              <Overview/>
            </div>
          </div>
        </div>
      </div>

    </div>
  );
};
const mapStateToProps = state => ({
  authUser: state.session.authUser,
});

export default compose(
  connect(mapStateToProps, null,),
)(CRM);