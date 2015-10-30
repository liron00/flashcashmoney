view User {  
  <loaded if={^user.displayName}>
    <NavLink class="userLink" to={"/" + ^user.slug}>
      <userSection>
        <UserCircle size={32} user={^user} glow={false} />
        {^user.displayName}
      </userSection>
    </NavLink>
  </loaded>
  <didntLoad if={!^user.displayName}>
    <uid>Unknown user {JSON.stringify(^user.uid)}</uid>
  </didntLoad>
  
  $userSection = {
    flexDirection: 'row',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 1
  }
  
  $loaded = {
    flexFlow: 'row',
    alignItems: 'flex-start'
  }
  
  $UserCircle = {
    marginRight: 8
  }
  
  $uid = {
    fontFamily: 'courier new'
  }
}
