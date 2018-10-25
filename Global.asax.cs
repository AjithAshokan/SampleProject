  protected void Application_BeginRequest()
        {
            try
            {
                Response.Cache.SetCacheability(HttpCacheability.NoCache);
                Response.Cache.SetExpires(DateTime.UtcNow.AddHours(-1));
                Response.Cache.SetNoStore();
            }
            catch
            {


            }
        }
        ///
        
         <system.web>
    <sessionState timeout="45" mode="InProc"/>
    <compilation debug="true" targetFramework="4.6.1"/>
    <httpRuntime targetFramework="4.6.1"/>
  </system.web>
