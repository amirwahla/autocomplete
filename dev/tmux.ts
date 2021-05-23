const sessionsArg: Fig.Arg = {
  name: "target-session",
  generators: {
    script: "tmux ls",
    postProcess: (out) => {
      return out.split("\n").map((line) => {
        const content = line.split(":");

        return {
          name: content[0],
          description: content[1],
        };
      });
    },
  },
};

const clientsArg: Fig.Arg = {
  name: "target-client",
  generators: {
    script: "tmux lsc",
    postProcess: (out) => {
      return out.split("\n").map((line) => {
        const content = line.split(":");

        return {
          name: content[0],
          description: content[1],
        };
      });
    },
  },
};

const formatOption: Fig.Option = {
  name: "-F",
  description: "Format output",
  args: {
    name: "format",
    description: "The format for the output of this command",
  },
};

const flagsOption: Fig.Option = {
  name: "-f",
  description: "Set client flags",
  args: {
    name: "flags",
    description: "Comma-separated list of flags",
    suggestions: [
      "active-pane",
      "ignore-size",
      "no-output",
      "pause-after",
      "read-only",
      "wait-exit",
    ],
  },
};

export const completion: Fig.Spec = {
  name: "tmux",
  description: "A terminal multiplexer",
  subcommands: [
    {
      name: ["a", "at", "attach", "attach-session"],
      description: "Attach to last session",
      options: [
        {
          name: "-d",
          description: "Detach all others clients to the session",
        },
        {
          name: "-x",
          description:
            "Send SIGHUP to the parent process and detach the client",
        },
        flagsOption,
        {
          name: "-c",
          description: "Set the session's working directory",
          args: {
            name: "working-directory",
            description: "The session's working directory",
            template: "folders",
          },
        },
        {
          name: "-E",
          description: "Don't use update-environment option",
        },
        {
          name: "-t",
          description: "Attach to a session with the given name",
          args: sessionsArg,
        },
      ],
    },
    {
      name: ["bind", "bind-key"],
      description: "Bind a key to a command",
    },
    {
      name: "break-pane",
      description: "Break a pane from an exiting into a new window",
    },
    {
      name: ["capturep", "capture-pane"],
      description: "Capture the contents of a pane to a buffer",
    },
    {
      name: "choose-buffer",
      description: "Put a pane into buffer choice mode",
    },
    {
      name: "choose-client",
      description: "Put a pane into buffer client mode",
    },
    {
      name: "choose-tree",
      description: "Put a pane into buffer tree mode",
    },
    {
      name: ["clearhist", "clear-history"],
      description: "Remove and clear history for a pane",
    },
    {
      name: "clock-mode",
      description: "Enter clock mode",
    },
    {
      name: "command-prompt",
      description: "Open the tmux command prompt in a client",
      // TODO add other options
      options: [
        {
          name: "-t",
          description: "The target client",
          args: clientsArg,
        },
      ],
    },
    {
      name: ["confirm", "confirm-before"],
      description: "Run a command but ask for confirmation before",
      args: {
        name: "command",
        description: "The command to run",
        variadic: true,
      },
      options: [
        {
          name: "-p",
          description: "A prompt to display for confirmation",
          args: {
            name: "prompt",
          },
        },
        {
          name: "-t",
          description: "The target client",
          args: clientsArg,
        },
      ],
    },
    {
      name: "copy-mode",
      description: "Ennter copy mode",
    },
    {
      name: ["deleteb", "delete-buffer"],
      description: "Delete a paste buffer",
    },
    {
      name: ["detach", "detach-client"],
      description: "Detach a client from the server",
      options: [
        {
          name: "-a",
          description: "Kills all but the client given with -t",
        },
        {
          name: "-P",
          description: "Send SIGHUP to the parent process",
        },
        {
          name: "-E",
          description: "Run the given shell-command to replace the client",
          args: {
            name: "shell-command",
            description: "The shell-command to run",
            variadic: true,
          },
        },
        {
          name: "-t",
          description: "The target client",
          args: clientsArg,
        },
        {
          name: "-s",
          description: "Detach all clients attached to the specified session",
          args: sessionsArg,
        },
      ],
    },
    {
      name: ["menu", "display-menu"],
      description: "Display menu on target-client",
      // TODO add other options
      options: [
        {
          name: "-c",
          description: "The target client",
          args: clientsArg,
        },
      ],
    },
    {
      name: ["display", "display-message"],
      description: "Display a message in the status line",
      // TODO add other options
      options: [
        {
          name: "-c",
          description: "The target client",
          args: clientsArg,
        },
      ],
    },
    {
      name: ["displayp", "display-panes"],
      description: "Display an indicator for each visible pane",
      args: {
        name: "template",
        default: "'select-pane -t %%'",
        isOptional: true,
      },
      options: [
        {
          name: "-b",
          description:
            "Do not block other commands from running until the indicator is closed",
        },
        {
          name: "-N",
          description: "Do not close the indicator when a key is pressed",
        },
        {
          name: "-d",
          description: "Specify the duration",
          args: {
            name: "duration",
            description:
              "The duration to close the indicator after in milliseconds",
          },
        },
        {
          name: "-t",
          description: "The target client",
          args: clientsArg,
        },
      ],
    },
    {
      name: ["findw", "find-window"],
      description: "Search for a pattern in windows",
    },
    {
      name: ["has", "has-session"],
      description: "Check and report if a session exists on the server",
      options: [
        {
          name: "-t",
          description: "Specify the target session",
          args: sessionsArg,
        },
      ],
    },
    {
      name: ["if", "if-shell"],
      description: "Execute a tmux command if a shell-command succeeded",
    },
    {
      name: ["joinp", "join-pane"],
      description: "Split a pae and move an existing one into the new space",
    },
    {
      name: ["killp", "kill-pane"],
      description: "Destroy a given pane",
    },
    {
      name: "kill-server",
      description: "Kill clients, session and server",
    },
    {
      name: ["kill-ses", "kill-session"],
      description: "Kill/delete sessions",
      options: [
        {
          name: "-t",
          description: "Kill/delete session with the given name",
          args: sessionsArg,
        },
        {
          name: "-a",
          description: "Kill/delete all session but the current",
        },
        {
          name: "-C",
          description:
            "Clear alerts (bell, activity, or silence) in all windows linked to the session",
        },
      ],
    },
    {
      name: ["killw", "kill-window"],
      description: "Destroy a given window",
    },
    {
      name: ["lastp", "last-pane"],
      description: "Select the previously selected pane",
    },
    {
      name: ["last", "last-window"],
      description: "Select the previously selected window",
      options: [
        {
          name: "-t",
          description:
            "Select the previously select window of the target-session",
          args: sessionsArg,
        },
      ],
    },
    {
      name: ["linkw", "link-window"],
      description: "Link a window to another",
    },
    {
      name: ["linkw", "link-window"],
      description: "Link a window to another",
    },
    {
      name: ["lsb", "list-buffers"],
      description: "List paste buffers of a session",
    },
    {
      name: ["lsc", "list-clients"],
      description: "List clients attached to a server",
      options: [
        formatOption,
        {
          name: "-t",
          description: "List only clients connected to that session",
          args: sessionsArg,
        },
      ],
    },
    {
      name: ["lscm", "list-commands"],
      description: "List supported sub-commands",
      args: {
        name: "command",
        description: "The command to list syntax of",
        isOptional: true,
      },
      options: [formatOption],
    },
    {
      name: ["lsk", "list-keys"],
      description: "List all key-bindings",
    },
    {
      name: ["lsp", "list-panes"],
      description: "List panes of a window",
    },
    {
      name: ["ls", "list-sessions"],
      description: "List sessions managed by a server",
      options: [
        formatOption,
        {
          name: "-f",
          description: "Filter the sessions",
          args: {
            name: "filter",
          },
        },
      ],
    },
    {
      name: ["lsw", "list-windows"],
      description: "List windows of a session",
      options: [
        {
          name: "-t",
          description: "List windows of the target-session",
          args: sessionsArg,
        },
      ],
    },
    {
      name: ["loadb", "load-buffer"],
      description: "Load a file intoa paste buffer",
      // TODO add other options
      options: [
        {
          name: "-t",
          description: "The target client",
          args: clientsArg,
        },
      ],
    },
    {
      name: ["lockc", "lock-client"],
      description: "Lock a client",
      options: [
        {
          name: "-t",
          description: "The target client",
          args: clientsArg,
        },
      ],
    },
    {
      name: ["lock", "lock-server"],
      description: "Lock all clients attached to the server",
    },
    {
      name: ["locks", "lock-session"],
      description: "Lock all clients attached to a session",
      options: [
        {
          name: "-t",
          description: "Lock all clients attached to target-session",
          args: sessionsArg,
        },
      ],
    },
    {
      name: ["movep", "move-pane"],
      description: "Move a pane into a new space",
    },
    {
      name: ["movew", "move-window"],
      description: "Move a window to another",
    },
    {
      name: ["new", "new-session"],
      description: "Create a new session",
      args: {
        name: "shell-command",
        description: "A shell command to run when creating the session",
      },
      options: [
        {
          name: "-A",
          description:
            "Behave like attach-session if session-name already exist",
        },
        {
          name: "-d",
          description: "Use the initial size from default-size",
        },
        {
          name: "-D",
          description: "Behave like -d if -A is set",
        },
        {
          name: "-E",
          description: "Do not use update-environment option",
        },
        {
          name: "-P",
          description: "Print informations about the new session",
        },
        {
          name: "-X",
          description: "Behave like -x if -A is set",
        },
        {
          name: "-c",
          description: "Specify a start directory for the session",
          args: {
            name: "start-directory",
            description: "The start directory",
            template: "folders",
          },
        },
        {
          name: "-e",
          description: "Set environment variables",
          args: {
            name: "environment",
            description: "Environment variables with the form VARIABLE=VALUE",
          },
        },
        flagsOption,
        formatOption,
        {
          name: "-n",
          description: "Start a new session with the given name",
          args: {
            name: "window-name",
          },
        },
        {
          name: "-s",
          description: "Start a new session with the given name",
          args: {
            name: "session-name",
          },
        },
        // TODO group-name
        {
          name: "-x",
          description: "The width of the session",
          args: {
            name: "width",
          },
        },
        {
          name: "-y",
          description: "The height of the session",
          args: {
            name: "height",
          },
        },
      ],
    },
    {
      name: ["neww", "new-window"],
      description: "Create a new window",
    },
    {
      name: ["nextl", "next-layout"],
      description: "Move a window to the next layout",
    },
    {
      name: ["next", "next-window"],
      description: "Move to the next window in a session",
      options: [
        {
          name: "-t",
          description: "Move to the next window of the target-session",
          args: sessionsArg,
        },
      ],
    },
    {
      name: ["pasteb", "paste-buffer"],
      description: "Insert a paste buffer into the window",
    },
    {
      name: ["pipep", "pipe-pane"],
      description: "Pipe output from a pane to a shell command",
    },
    {
      name: ["prevl", "previous-layout"],
      description: "Move a window to the previous layout",
    },
    {
      name: ["prev", "previous-window"],
      description: "Move to the previous window in a session",
      options: [
        {
          name: "-t",
          description: "Move to the previous window of the target-session",
          args: sessionsArg,
        },
      ],
    },
    {
      name: ["refresh", "refresh-client"],
      description: "Refresh a client",
      // TODO add other options
      options: [
        {
          name: "-t",
          description: "The target client",
          args: clientsArg,
        },
      ],
    },
    {
      name: ["rename", "rename-session"],
      description: "Rename a session",
      options: [
        {
          name: "-t",
          description: "Rename the target-session",
          args: sessionsArg,
        },
      ],
      args: {
        name: "new-name",
        description: "The new name of the session",
      },
    },
    {
      name: ["renamew", "rename-window"],
      description: "Rename a window",
    },
    {
      name: ["resizep", "resize-pane"],
      description: "Resize a pane",
    },
    {
      name: ["resizew", "resize-window"],
      description: "Resize a window",
    },
    {
      name: ["respawnp", "respawn-pane"],
      description: "Resue a pane in which a command has exited",
    },
    {
      name: ["respawnw", "respawn-window"],
      description: "Resue a window in which a command has exited",
    },
    {
      name: ["rotatew", "rotate-window"],
      description: "Rotate positions of panes in a window",
    },
    {
      name: ["run", "run-shell"],
      description: "Execute a command without create a new window",
    },
    {
      name: ["saveb", "save-buffer"],
      description: "Save a paste buffer to a file",
    },
    {
      name: ["selectl", "select-layout"],
      description: "Choose a layout for a pane",
    },
    {
      name: ["selectp", "select-pane"],
      description: "Make a pane the active one in the window",
    },
    {
      name: ["selectw", "select-window"],
      description: "Select a window",
    },
    {
      name: ["send", "send-keys"],
      description: "Send key(s) to a window",
    },
    {
      name: "send-prefix",
      description: "Send the prefix key to a window",
    },
    {
      name: ["info", "server-info"],
      description: "Show every session, window, pane, etc...",
    },
    {
      name: ["setb", "set-buffer"],
      description: "Set content of a paste buffer",
      // TODO add other options
      options: [
        {
          name: "-t",
          description: "The target client",
          args: clientsArg,
        },
      ],
    },
    {
      name: ["setenv", "set-environment"],
      description: "(Un)set an environment variable",
    },
    {
      name: "set-hook",
      description: "Set a hook to a command",
    },
    {
      name: ["set", "set-option"],
      description: "Set a session option",
    },
    {
      name: ["setw", "set-window-option"],
      description: "Set a window option",
    },
    {
      name: ["showb", "show-buffer"],
      description: "Display the contents of a paste buffer",
    },
    {
      name: ["showenv", "show-environment"],
      description: "Display the environment",
      options: [
        {
          name: "-t",
          description: "Displat the environment of the target-session",
          args: sessionsArg,
        },
      ],
    },
    {
      name: "show-hooks",
      description: "Show the global list of hooks",
    },
    {
      name: ["showmsgs", "show-messages"],
      description: "Show client's message log",
      options: [
        {
          name: "-T",
          description: "Show debugging information about terminals",
        },
        {
          name: "-J",
          description: "Show debugging information about jobs",
        },
        {
          name: "-t",
          description: "The target client",
          args: clientsArg,
        },
      ],
    },
    {
      name: ["show", "show-options"],
      description: "Show session options",
    },
    {
      name: ["showw", "show-winsow-options"],
      description: "Show window options",
    },
    {
      name: ["source", "source-file"],
      description: "Execute tmux commands from a file",
      args: {
        name: "path",
        variadic: true,
      },
      options: [
        {
          name: "-F",
          description: "Expand path as a format",
        },
        {
          name: "-n",
          description: "Parse the file but don't run commands",
        },
        {
          name: "-q",
          description: "Don't return any error if path does not exist",
        },
        {
          name: "-v",
          description: "Show the parsed command and line numbers if possible",
        },
      ],
    },
    {
      name: ["splitw", "split-window"],
      description: "Splits a pane into two",
    },
    {
      name: ["start", "start-server"],
      description: "Start a tmux server",
    },
    {
      name: ["suspendc", "suspend-client"],
      description: "Suspend a client",
      options: [
        {
          name: "-t",
          description: "The target client",
          args: clientsArg,
        },
      ],
    },
    {
      name: ["swapp", "swap-pane"],
      description: "Swap two panes",
    },
    {
      name: ["swapw", "swap-window"],
      description: "Swap two windows",
    },
    {
      name: ["switchc", "switch-client"],
      description: "Switch the client to another session",
      options: [
        {
          name: "-E",
          description: "Do not use update-environment option",
        },
        {
          name: "-l",
          description: "Move the client to the last session",
        },
        {
          name: "-n",
          description: "Move the client to the next session",
        },
        {
          name: "-p",
          description: "Move the client to the previous session",
        },
        {
          name: "-r",
          description: "Toggle the client read-only and ignore-size flags",
        },
        {
          name: "-Z",
          description: "Keep the window zoomed if it was zoomed",
        },
        {
          name: "-c",
          description: "The target client",
          args: clientsArg,
        },
        {
          name: "-t",
          description: "Switch the client to the target-session",
          args: sessionsArg,
        },
        {
          name: "-T",
          description: "Set the client's key table",
          args: {
            name: "key-table",
          },
        },
      ],
    },
    {
      name: ["unbind", "unbind-key"],
      description: "Unbind a key",
    },
    {
      name: ["unlinkw", "unlink-window"],
      description: "Unlink a window",
    },
    {
      name: ["wait", "wait-for"],
      description: "Wait for an event or trigger it",
    },
  ],
};