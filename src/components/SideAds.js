// src/components/SideAds.js
import React from 'react';
import './SideAds.css';

export default function SideAds() {
  // You can replace these divs with your actual ad code (e.g. <ins className="adsbygoogle" …/>)
  return (
    <>
      <div className="side-ad side-ad--left">
        <small>Advertisement</small>
        <div className="side-ad__placeholder">300×600</div>
      </div>
      <div className="side-ad side-ad--right">
        <small>Advertisement</small>
        <div className="side-ad__placeholder">300×600</div>
      </div>
    </>
  );
}
