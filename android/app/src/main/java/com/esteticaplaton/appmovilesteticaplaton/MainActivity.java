package com.esteticaplaton.appmovilesteticaplaton;
import android.os.Bundle;

import com.getcapacitor.BridgeActivity;

public class MainActivity extends BridgeActivity {
    public void onCreate(Bundle savedInstanceState) {
    registerPlugin(com.getcapacitor.community.stripe.StripePlugin.class);
    super.onCreate(savedInstanceState);
  }

}
    
