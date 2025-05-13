import React from 'react';
import PropTypes from 'prop-types';
import './NavItems.css';

// Generic NavItem class component
export class NavItem extends React.Component {
    handleClick = (e) => {
        const { href, onClick } = this.props;
        if (onClick) {
            e.preventDefault();
            onClick(href);
        }
    }

    render() {
        const { href, className, children, tagName } = this.props;
        const Tag = tagName || 'a';
        return (
            <Tag
                href={href}
                className={`nav-item ${className || ''}`}
                onClick={this.handleClick}
            >
                {children}
            </Tag>
        );
    }
}

NavItem.propTypes = {
    href: PropTypes.string.isRequired,
    className: PropTypes.string,
    children: PropTypes.node.isRequired,
    tagName: PropTypes.string,
    onClick: PropTypes.func,
};

// Specific NavItem wrappers
export class PrivacyPolicy extends React.Component {
    render() {
        return (
            <NavItem href="/privacy-policy" className="privacy-policy" {...this.props}>
                Privacy Policy
            </NavItem>
        );
    }
}

export class Covid19 extends React.Component {
    render() {
        return (
            <NavItem href="/covid" className="covid-19" {...this.props}>
                COVID-19
            </NavItem>
        );
    }
}

export class FindDoctor extends React.Component {
    render() {
        return (
            <NavItem href="/find-doctor" className="find-doctor" {...this.props}>
                Find a Doctor
            </NavItem>
        );
    }
}

export class AllLocations extends React.Component {
    render() {
        return (
            <NavItem href="/locations" className="all-locations" {...this.props}>
                All Locations
            </NavItem>
        );
    }
}

export class GetCare extends React.Component {
    render() {
        return (
            <NavItem href="/get-care" className="get-care" {...this.props}>
                Get Care
            </NavItem>
        );
    }
}

export class PatientsVisitors extends React.Component {
    render() {
        return (
            <NavItem href="/patients-visitors" className="patients-visitors" {...this.props}>
                Patients & Visitors
            </NavItem>
        );
    }
}

export class AboutUs extends React.Component {
    render() {
        return (
            <NavItem href="/about-us" className="about-us" {...this.props}>
                About Us
            </NavItem>
        );
    }
}

export class Donate extends React.Component {
    render() {
        return (
            <NavItem href="/donate" className="donate" {...this.props}>
                Donate
            </NavItem>
        );
    }
}

export class Careers extends React.Component {
    render() {
        return (
            <NavItem href="/careers" className="careers" {...this.props}>
                Careers
            </NavItem>
        );
    }
}

export class MyChartButton extends React.Component {
    render() {
        return (
            <NavItem
                tagName="button"
                href="/mychart"
                className="mychart-btn"
                {...this.props}
            >
                📒 MyChart
            </NavItem>
        );
    }
}

// Default NavItems container
export default class NavItems extends React.Component {
    static defaultProps = {
        items: [
            { key: 'privacy', label: 'Privacy Policy', href: '/privacy-policy', className: 'privacy-policy' },
            { key: 'covid', label: 'COVID-19', href: '/covid', className: 'covid-19' },
            { key: 'find', label: 'Find a Doctor', href: '/find-doctor', className: 'find-doctor' },
            { key: 'locations', label: 'All Locations', href: '/locations', className: 'all-locations' },
            { key: 'get-care', label: 'Get Care', href: '/get-care', className: 'get-care' },
            { key: 'patients', label: 'Patients & Visitors', href: '/patients-visitors', className: 'patients-visitors' },
            { key: 'about', label: 'About Us', href: '/about-us', className: 'about-us' },
            { key: 'donate', label: 'Donate', href: '/donate', className: 'donate' },
            { key: 'careers', label: 'Careers', href: '/careers', className: 'careers' },
        ],
    };

    render() {
        const { items, onNavClick } = this.props;
        return (
            <nav className="nav-items-container">
                {items.map(({ key, label, href, className }) => (
                    <NavItem
                        key={key}
                        href={href}
                        className={className}
                        onClick={onNavClick}
                    >
                        {label}
                    </NavItem>
                ))}
                <MyChartButton onClick={onNavClick} />
            </nav>
        );
    }
}
