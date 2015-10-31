view User {  
  <loaded if={view.props.user.displayName}>
    <NavLink class="userLink" to={"/" + view.props.user.slug}>
      <userSection>
        <UserCircle size={32} user={view.props.user} glow={false} />
        {view.props.user.displayName}
      </userSection>
    </NavLink>
  </loaded>
  <didntLoad if={!view.props.user.displayName}>
    <uid>Unknown user {JSON.stringify(view.props.user.uid)}</uid>
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
