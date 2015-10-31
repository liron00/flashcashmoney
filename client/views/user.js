view User {  
  <loaded if={view.props.user.displayName}>
    <userSection>
      <NavLink class="userLink" to={"/" + view.props.user.slug}>
        <UserCircle size={32} user={view.props.user} glow={false} />
      </NavLink>
      <rightSection>
        <NavLink class="userLink" to={"/" + view.props.user.slug}>
          {view.props.user.displayName}
        </NavLink>
        <fbLinkSection if={view.props.showFbLink}>
          <dash>-</dash>
          <fbProfileLink-a
            href={view.props.user.facebookProfileUrl}
            target="_blank">
            Facebook
          </fbProfileLink-a>
        </fbLinkSection>
      </rightSection>
    </userSection>
  </loaded>
  <didntLoad if={!view.props.user.displayName}>
    <uid>Unknown user {JSON.stringify(view.props.user.uid)}</uid>
  </didntLoad>
  
  $rightSection = {
    flexDirection: 'row'
  }
  
  $userSection = {
    flexDirection: 'row',
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 1
  }
  
  $fbLinkSection = {
    flexDirection: 'row'
  }
  
  $dash = {
    marginLeft: 4,
    marginRight: 4,
    fontSize: 14,
    color: '#666'
  }
  
  $fbProfileLink = {
    fontFamily: 'Copperplate',
    fontWeight: 'bold',
    color: '#ccc',
    position: 'relative',
    top: 1
  }
  
  $loaded = {
    flexDirection: 'row',
    alignItems: 'flex-start'
  }
  
  $UserCircle = {
    marginRight: 8
  }
  
  $uid = {
    fontFamily: 'courier new'
  }
}
