import React from 'react';
import { Nav, Button, Avatar } from '@douyinfe/semi-ui';
import { IconSemiLogo, IconBell, IconHelpCircle, IconHome,IconLive } from '@douyinfe/semi-icons';


function navIndex(){
    return (
        <Nav mode="horizontal" defaultSelectedKeys={['Home']}>
            <Nav.Header>
                <IconSemiLogo style={{ fontSize: 36 }} />
            </Nav.Header>
            <Nav.Item itemKey="Home" text="首页" icon={<IconHome size="large" />} />
            <Nav.Item itemKey="Live" text="上传资源" icon={<IconLive size="large" />} />
            <Nav.Footer>
                <Button
                    theme="borderless"
                    icon={<IconBell size="large" />}
                    style={{
                        color: 'var(--semi-color-text-2)',
                        marginRight: '12px',
                        }}
                />
                <Button
                    theme="borderless"
                    icon={<IconHelpCircle size="large" />}
                        style={{
                            color: 'var(--semi-color-text-2)',
                            marginRight: '12px',
                        }}
                    />
                <Avatar color="orange" size="small">
                    YJ
                </Avatar>
            </Nav.Footer>
        </Nav>
    )
}

export default navIndex